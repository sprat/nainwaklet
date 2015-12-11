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
            infoFrame,
            dashboard,
            spy,
            channel;

        conf = conf || {};
        user = conf.user || User();

        // create the (communication) channel
        channelName = conf.channel || 'default';
        channel = Channel(channelName);
        channel.connect();

        // create the dashboard
        container = getElement(conf.container || window.document.body);
        if (container) {
            dashboard = Dashboard(container, channel);
        }

        // create the spy
        infoFrame = getElement(conf.infoFrame);
        if (infoFrame) {
            spy = Spy(infoFrame);
        }

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
