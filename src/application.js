var extend = require('xtend/mutable');
var includeCSS = require('./include-css');
var Dom = require('./dom');
var Nain = require('./nain');
var Spy = require('./spy');
var Updater = require('./updater');
//var Channel = require('./channel');
var Dashboard = require('./dashboard');
var Pages = require('./pages');
var log = require('./log');
require('./application.css');
require('./contours.css');

var defaultConfiguration = {
    /* Channel name */
    channel: 'default',
    /* PubNub account's publish key */
    publishKey: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
    /* PubNub accounts's subscribe key */
    subscribeKey: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f',
    /* URL of the update page: the Nany application will post updates
     * when the user navigate between Nainwak pages */
    updateUrl: null
    /* URL of the login page: it will be put in an iframe and should return an
     * access token via postMessage */
    //authenticationUrl: null
};

/* Application class */
function Application(configuration) {
    var config = extend({}, defaultConfiguration, configuration);
    var frames = window.frames;
    var infoFrame = frames.info;
    var container = frames.pub.document.body;
    var nain = Nain.fromDocument(frames.menu.document);
    var updatePages = ['detect', 'invent', 'perso', 'even'];
    var context = {};  // game information fetched by the current player
    var channelName = config.channel;

    // create the spy if the info frame is available
    var spy;
    if (infoFrame) {
        spy = Spy(infoFrame);
        spy.documentChanged.add(onInfoChange);
    }

    // create the updater if an update URL is available
    var updater;
    if (config.updateUrl) {
        updater = Updater(config.updateUrl);
    }

    /*
    // create the (communication) channel
    var channel = Channel(channelName, config.publishKey, config.subscribeKey);
    channel.connect();
    */

    // include the Nany CSS into the container document...
    includeCSS(container.ownerDocument);

    // create a Mounter to render our components into the DOM
    var mounter = Dom.Mounter();

    // create the dashboard object
    var dashboard = Dashboard(channelName, mounter.refresh);

    // backup the content of the container and clear it before installing our UI
    var containerChildren = Array.prototype.slice.call(container.childNodes);
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
        var page = Pages.byUrl(url);
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
            // include the Nany CSS in the new document
            includeCSS(doc);

            // enhance
            page.enhance(doc, context);
        }
    }

    function loadPersoPage() {
        var persoPage = Pages.byType('perso');

        log('Loading perso page');
        persoPage.fetch(nain.ids, function (response) {
            if (response.statusCode === 200) {
                log('OK');
                processPageDocument(persoPage.url, response.body);
            } else {
                log('FAIL (' + response.statusCode + ')');
            }
        });
    }

    // called when the info frame change
    function onInfoChange(doc) {
        var url = doc.location.pathname;

        log('Navigation to ' + url);
        processPageDocument(url, doc);
    }



    return Object.freeze({
        destroy: destroy
    });
}

module.exports = Application;
