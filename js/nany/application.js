define(['./spy', './dashboard', './user', './channel'], function (Spy, Dashboard, User, Channel) {
    'use strict';

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
        var user,
            channelName,
            container,
            dashboard,
            spy,
            channel;

        conf = conf || {};
        conf.user = conf.user || User();

        conf.container = getElement(conf.container || window.document.body);

        // create the (communication) channel
        channelName = conf.channel || 'default';
        channel = Channel(channelName);
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
            user: user,
            channel: channel,
            dashboard: dashboard,
            spy: spy,
            destroy: destroy
        });
    }

    return Application;
});
