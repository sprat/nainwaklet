var Spy = require('./spy'),
    Dashboard = require('./dashboard'),
    User = require('./user'),
    Channel = require('./channel');


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
function Application(conf) {
    var channel,
        dashboard,
        spy;

    conf = conf || {};
    conf.channel = conf.channel || 'default';
    conf.container = getElement(conf.container || window.document.body);
    conf.user = conf.user || User();

    // create the (communication) channel
    channel = Channel(conf.channel);
    channel.connect();
    conf.channel = channel;

    // create the dashboard
    dashboard = Dashboard(conf);

    // create the spy (if an info frame is available)
    spy = Spy(conf);

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
        user: conf.user,
        channel: channel,
        dashboard: dashboard,
        spy: spy,
        destroy: destroy
    });
}


module.exports = Application;
