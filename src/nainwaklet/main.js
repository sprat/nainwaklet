/* Module API */
define(['./config', './nainwak', './user', './app', './buttons'], function (config, nainwak, User, Application, buttons) {
    'use strict';

    var scriptUrl = config.scriptUrl();
    console.log(scriptUrl);

    // module public API
    var api = {
        User: User,
        Application: Application,
        initializeButtons: buttons.initialize.bind(buttons, scriptUrl)
    };

    // create an application object if we are in the Nainwak game page
    if (nainwak.isInGame(window)) {
        api.application = Application({
            user: nainwak.getUser(window),
            channel: config.channel,
            container: window.frames.pub.document.body,
            spyFrame: window.frames.info.frameElement
        });
    }

    return Object.freeze(api);
});
