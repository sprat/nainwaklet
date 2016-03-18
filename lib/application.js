var script = require('./script'),
    Spy = require('./spy'),
    Renderer = require('./renderer'),
    querystring = require('querystring'),
    User = require('./user'),
    //Channel = require('./channel'),
    Ring = require('./ring'),
    pages = require('./pages'),
    analyzer = require('./pages/analyzer'),
    extend = require('xtend/mutable'),
    log = require('./log');

/* Get the Nainwak User info from the menu frame */
function getUser(menuDoc) {
    var name = analyzer.getText(menuDoc, '.news-titre td:last-child');
    return User(name);
}

function getIDS(doc) {
    var qs = doc.location.search.substring(1);
    return querystring.parse(qs).IDS;
}

/* Application class */
function Application() {
    var frames = window.frames,
        infoFrame = frames.info,
        container = frames.pub.document.body,
        user = getUser(frames.menu.document),
        IDS = getIDS(document),
        channelName = script.getParameter('channel') || 'default',
        ringUpdateUrl = script.getParameter('ring-update-url'),
        ringUpdatePages = ['detect', 'invent', 'perso', 'even'],
        infos = {},
        containerContent,  // backup of the initial content of the container
        dashboard,
        //channel,
        spy,
        ring;

    function init() {
        /*
        // create the (communication) channel
        channel = Channel(channelName);
        channel.connect();
        */

        // create the ring updater
        if (ringUpdateUrl && user) {
            ring = Ring(ringUpdateUrl, user);
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
            var oldDashboard = dashboard,
                parent = oldDashboard.parentNode;
            dashboard = renderDashboard(h);
            parent.replaceChild(dashboard, oldDashboard);
        };

        // backup the initial content and install our UI
        // Note: we never remove the CSS, maybe that's something we should do...
        script.loadCSS(container.ownerDocument);
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

    function processPageDocument(url, doc) {
        var date = new Date(),
            page = pages.byUrl(url),
            analysis,
            pager;

        if (page && page.analyze) {
            // analyze the page
            analysis = page.analyze(doc, date);
            log(analysis);

            // send an update to the Ring
            if (ring && ringUpdatePages.indexOf(page.type) > -1) {
                ring.sendUpdate(page, doc, date, analysis);
            }

            // store the analysis in the infos object
            pager = analysis.pager;
            delete analysis.pager;
            extend(infos, analysis);
            if (pager && infos.perso) {
                extend(infos.perso, pager);
            }

            // TODO: enhance the page
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
        return h('div.nany.nany-dashboard', [
            h('div.VNT.title', channelName),
            renderContent(h)
        ]);
    }

    function renderContent(h) {
        var content = [];

        // replace by components' views
        if (!user.password) {
            content.push(renderPasswordField(h));
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

    function renderPasswordField(h) {
        return h('label.password-field', [
            'Mot de passe du Ring',
            h('input', [], {
                type: 'password',
                onchange: function (event) {
                    var password = event.target.value;
                    user.updatePassword(password);
                    h.update();
                }
            })
        ]);
    }

    init();

    return Object.freeze({
        destroy: destroy
    });
}

module.exports = Application;
