/* Module API */
define(['./config', './nainwak', './user', './hub', './buttons'], function (config, nainwak, User, Hub, buttons) {
    'use strict';

    var scriptUrl = config.scriptUrl();

    // module public API
    var api = {
        User: User,
        Hub: Hub,
        initializeButtons: buttons.initialize.bind(buttons, scriptUrl)
    };

    // create an Hub object if we are in the Nainwak game page
    if (nainwak.isInGame(window)) {
        api.hub = Hub({
            user: nainwak.getUser(window),
            channel: config.channel,
            container: window.frames.pub.document.body,
            infoFrame: window.frames.info.frameElement
        });
    }

    return api;
});
