/* Application factory */
define(['./spy', './hub', './user'], function (Spy, Hub, User) {
    function Application(conf) {
        var _conf = conf || {},
            user = _conf.user || User(),
            channel = _conf.channel || 'default',
            container = _conf.container || window.document.body,
            spyFrame = _conf.spyFrame,  // should be the frame element
            hub,
            spy;

        if (container) {
            hub = Hub(container, user, channel);
        }

        if (spyFrame) {
            spy = Spy(spyFrame, user, channel);
        }

        function destroy() {
            if (spy) {
                spy.enabled = false;
            }

            if (hub) {
                hub.enabled = false;
            }
        }

        return Object.freeze({
            user: user,
            hub: hub,
            spy: spy,
            destroy: destroy
        });
    }

    return Application;
});
