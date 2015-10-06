/* Hub class */
define(['./spy', './dashboard', './user'], function (Spy, Dashboard, User) {
    function getContainerElement(container) {
        var doc = window.document;
        if (container === undefined) {
            container = doc.body;
        } else if (container.nodeType === undefined) {  // it's not a node
            // we assume it's a selector
            container = doc.querySelector(container);
        }
        return container;
    }

    function Hub(conf) {
        var _conf = conf || {},
            user = _conf.user || User(),
            channel = _conf.channel || 'default',
            container = getContainerElement(_conf.container),
            infoFrame = _conf.infoFrame,  // should be the frame element
            dashboard,
            spy;

        if (container) {
            dashboard = Dashboard(container, user, channel);
        }

        if (infoFrame) {
            spy = Spy(infoFrame, user, channel);
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
            user: user,
            dashboard: dashboard,
            spy: spy,
            destroy: destroy
        });
    }

    return Hub;
});
