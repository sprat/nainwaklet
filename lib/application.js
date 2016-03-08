var Spy = require('./spy'),
    Dashboard = require('./dashboard'),
    User = require('./user'),
    Channel = require('./channel'),
    Ring = require('./ring'),
    log = require('./log');

function getElement(target) {
    if (target === undefined || target === null) {
        return;
    }

    if (target.nodeType !== undefined) {
        // it's already a node
        return target;
    }

    // otherwise, we assume it's a selector
    return window.document.querySelector(target);
}

/* Application class */
function Application(config) {
    var infoFrame = window.frames.info,
        channel,
        dashboard,
        spy,
        ring;

    config = config || {};
    config.channel = config.channel || 'default';
    config.container = getElement(config.container || window.document.body);
    config.user = config.user || User();

    // create the (communication) channel
    channel = Channel(config.channel);
    channel.connect();
    config.channel = channel;

    // create the ring updater
    if (config.ringUpdateUrl && config.user) {
        ring = Ring(config.ringUpdateUrl, config.user);
    }

    // create the dashboard
    dashboard = Dashboard(config);

    // create the spy if the info frame is available
    if (infoFrame) {
        spy = Spy(infoFrame);
        spy.on('change', onInfoChange);
    }

    function destroy() {
        if (spy) {
            spy.destroy();
        }

        if (dashboard) {
            dashboard.enabled = false;
        }

        channel.disconnect();
    }

    // called when the info frame change
    function onInfoChange(doc) {
        var url = doc.location.href;

        log('Navigation to ' + url);

        /*
        pages = require('./pages'),
        var page = pages.byUrl(url)
        if (page && page.analyze) {
            log('Analyzing ' + page.name);
            log(page.analyze(doc));
        }
        */

        if (ring) {
            ring.sendUpdate(doc);
        }
    }

    return Object.freeze({
        user: config.user,
        channel: channel,
        ring: ring,
        dashboard: dashboard,
        spy: spy,
        destroy: destroy
    });
}

module.exports = Application;
