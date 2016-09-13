var extend = require('xtend/mutable');
var loadCSS = require('./load-css');
var Spy = require('./spy');
var Renderer = require('./renderer');
var qs = require('qs');
var User = require('./user');
//var Channel = require('./channel');
var Updater = require('./updater');
var pages = require('./pages');
var analyzer = require('./pages/analyzer');
var log = require('./log');


var defaultConfiguration = {
    /* Channel name */
    channel: 'default',
    /* PubNub account's publish key */
    publishKey: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
    /* PubNub accounts's subscribe key */
    subscribeKey: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f',
    /* URL of the update page: the Nany application will post updates
     * when the user navigate between Nainwak pages */
    updateUrl: null,
    /* URL of the login page: it will be put in an iframe and should return an
     * access token via postMessage */
    //authenticationUrl: null
};


/* Get the Nainwak User info from the menu frame */
function getUser(menuDoc) {
    var name = analyzer.getText(menuDoc, '.news-titre td:last-child');
    return User(name);
}

function getIDS(doc) {
    var querystupdater = doc.location.search.substupdater(1);
    return qs.parse(querystupdater).IDS;
}

/* Application class */
function Application(configuration) {
    var config = extend({}, defaultConfiguration, configuration);
    var frames = window.frames;
    var infoFrame = frames.info;
    var container = frames.pub.document.body;
    var user = getUser(frames.menu.document);
    var IDS = getIDS(document);
    var updatePages = ['detect', 'invent', 'perso', 'even'];
    var context = {};
    var containerContent;  // backup of the initial content of the container
    var dashboard;
    var channelName = config.channel;
    //var channel;
    var spy;
    var updater;

    function init() {
        /*
        // create the (communication) channel
        channel = Channel(channelName, config.publishKey, config.subscribeKey);
        channel.connect();
        */

        // create the updater updater
        if (config.updateUrl && user) {
            updater = Updater(config.updateUrl, user);
        }

        // create the spy if the info frame is available
        if (infoFrame) {
            spy = Spy(infoFrame);
            spy.on('change', onInfoChange);
        }

        // load perso page
        loadPersoPage();

        // create a renderer for the Dashboard
        var h = Renderer(container.ownerDocument);
        h.update = function update() {
            var oldDashboard = dashboard;
            var parent = oldDashboard.parentNode;
            dashboard = renderDashboard(h);
            parent.replaceChild(dashboard, oldDashboard);
        };

        // backup the initial content and install our UI
        // Note: we never remove the CSS, maybe that's something we should do...
        loadCSS(container.ownerDocument);
        containerContent = container.innerHTML;
        container.innerHTML = '';
        dashboard = renderDashboard(h);
        container.appendChild(dashboard);
    }

    function destroy() {
        /*
        // disconnect the channel
        channel.disconnect();
        */

        // restore the initial content
        container.innerHTML = containerContent;

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
            // load the Nany CSS in the new document
            loadCSS(doc);

            // enhance
            page.enhance(doc, context);
        }
    }

    function loadPersoPage() {
        var persoPage = pages.byType('perso');

        log('Loading perso page');
        persoPage.fetch(IDS, function (response) {
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

    function renderDashboard(h) {
        return h('div.nany.dashboard', [
            h('div.VNT.title', channelName),
            renderContent(h)
        ]);
    }

    function renderContent(h) {
        var content = [];

        // replace by components' views
        if (!user.password) {
            content.push(renderLoginForm(h));
        } else {
            content.push(h.text('MAJ automatique activée'));
            content.push(renderDeconnectionButton(h));
        }

        return h('div.TV.content', content);
    }

    function renderDeconnectionButton(h) {
        return h('button.disconnect', 'Déconnexion', {
            onclick: function (/*event*/) {
                user.removePassword();
                h.update();
            }
        });
    }

    function renderLoginForm(h) {
        var passwordField = h('label.password-field', [
            'Mot de passe du Ring',
            h('input', [], {
                name: 'password',
                type: 'password'
            })
        ]);

        return h('form.login-form', [passwordField], {
            onsubmit: function (event) {
                var form = event.target;
                var inputs = form.elements;
                var password = inputs.password.value;

                user.updatePassword(password);
                h.update();
                return false;
            }
        });
    }

    init();

    return Object.freeze({
        destroy: destroy
    });
}

module.exports = Application;
