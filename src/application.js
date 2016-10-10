var assign = require('core-js/library/fn/object/assign');
var array = require('core-js/library/fn/array');
var addCSS = require('./add-css');
var Mounter = require('./mounter');
var analyzeMenu = require('./analyzers/menu');
var Spy = require('./spy');
var Updater = require('./updater');
//var Channel = require('./channel');
var Dashboard = require('./dashboard');
var pages = require('./pages');
var log = require('./log');

var defaultConfiguration = {
    /* Guild/group name shown in the dashboard */
    name: '<inconnu>',

    /* URL of the login page: a window will open with this URL when we
     * need authentication credentials; once logged, the page should return an
     * access token via postMessage */
    loginUrl: undefined,

    /* URL of the update page: the Nany application will post updates to this URL
     * when the user navigate between joueurwak pages */
    updateUrl: undefined

    /* PubNub account's publish & subscribe keys */
    //publishKey: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
    //subscribeKey: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f',
};

/* Application class */
function Application(configuration) {
    var config = assign({}, defaultConfiguration, configuration);
    var frames = window.frames;
    var infoFrame = frames.info;
    var menuDocument = frames.menu.document;
    var container = frames.pub.document.body;
    var updatePages = ['detect', 'invent', 'perso', 'even'];
    var context = {};  // game information fetched by the current joueur

    // analyze the menu in order the get the joueur information
    analyzeMenu(menuDocument, new Date(), context);

    // create the spy if the info frame is available
    var spy;
    if (infoFrame) {
        spy = Spy(infoFrame);
        spy.documentChanged.add(function (doc) {
            var url = doc.location.pathname;
            log('Navigation to ' + url);
            processPageDocument(url, doc);
        });
    }

    // create the updater if an update URL is available
    var updater;
    if (config.updateUrl) {
        updater = Updater(config.updateUrl);
    }

    /*
    // create the (communication) channel
    var channel = Channel(config.name, config.publishKey, config.subscribeKey);
    channel.connect();
    */

    // add the Nany CSS into the container document...
    var removeCSS = addCSS(container.ownerDocument);

    // create a Mounter to render our components into the DOM
    var mounter = Mounter();

    // create the dashboard object
    var dashboard = Dashboard(config.name, config.loginUrl, mounter.refresh);

    // backup the content of the container and clear it before installing our UI
    var containerChildren = array.from(container.childNodes);
    container.innerHTML = '';

    // install our UI
    var unmountDashboard = mounter.append(container, dashboard);

    // finally, load the perso page
    loadPersoPage();

    function destroy() {
        /*
        // disconnect the channel
        channel.disconnect();
        */

        // remove the CSS
        removeCSS();

        // restore the container's initial content
        unmountDashboard();
        container.innerHTML = '';
        containerChildren.forEach(function (child) {
            container.appendChild(child);
        });

        // destroy the spy
        if (spy) {
            spy.destroy();
        }
    }

    function shouldSendUpdateForPage(page) {
        return updatePages.indexOf(page.type) > -1;
    }

    function processPageDocument(url, doc) {
        var date = new Date();
        var page = pages.byUrl(url);
        var analysis;

        if (!page) {
            return;
        }

        // analyze the page
        if (page.analyze) {
            analysis = page.analyze(doc, date, context);
            log(analysis);
        }

        // send an update to the server
        if (updater && shouldSendUpdateForPage(page)) {
            updater.send(page, doc, date, analysis);
        }

        // enhance the page
        if (page.enhance) {
            // add the Nany CSS in the new document
            addCSS(doc);

            // enhance
            page.enhance(doc, context);
        }
    }

    function loadPersoPage() {
        var persoPage = pages.byType('perso');
        var joueur = context.joueur;

        log('Loading perso page');
        persoPage.fetch(joueur.ids, function (response) {
            if (response.statusCode === 200) {
                log('OK');
                processPageDocument(persoPage.url, response.body);
            } else {
                log('FAIL (' + response.statusCode + ')');
            }
        });
    }

    return Object.freeze({
        destroy: destroy
    });
}

module.exports = Application;
