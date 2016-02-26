var Spy = require('./spy'),
    Dashboard = require('./dashboard'),
    User = require('./user'),
    Channel = require('./channel'),
    Ring = require('./ring');


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
    var channel,
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

    // create the spy (if an info frame is available)
    spy = Spy(ring);

    function destroy() {
        if (spy) {
            spy.enabled = false;
        }

        if (dashboard) {
            dashboard.enabled = false;
        }

        channel.disconnect();
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
