define(['./spy', './dashboard', './user', './channel', 'utils/extend'], function (Spy, Dashboard, User, Channel, extend) {
    'use strict';

    function getElement(target) {
        if (target === undefined || target === null) {
            return target;
        }

        if (target.nodeType !== undefined) {
            return target;  // it's already a node
        }

        // so, we assume it's a selector
        return window.document.querySelector(target);
    }

    /* Application class */
    function Application(conf) {
        var dashboard,
            spy,
            channel;

        conf = extend({  // default conf
            user: User(),  // anonymous user
            channel: 'default',  // default channel
            container: window.document.body,  // dashboard container
            infoFrame: undefined  // info frame
        }, conf);

        conf.container = getElement(conf.container);
        conf.infoFrame = getElement(conf.infoFrame);

        // create the connection to the channel
        channel = Channel(conf.channel);
        channel.connect();
        conf.channel = channel;

        if (conf.container) {
            dashboard = Dashboard(conf);
        }

        if (conf.infoFrame) {
            spy = Spy(conf);
        }

        function destroy() {
            if (spy) {
                spy.enabled = false;
            }

            if (dashboard) {
                dashboard.enabled = false;
            }
        }

        return Object.freeze({
            user: conf.user,
            channel: conf.channel,
            dashboard: dashboard,
            spy: spy,
            destroy: destroy
        });
    }

    return Application;
});
