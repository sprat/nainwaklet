/* Module API */
define(['./nainwak', './user', './app', './buttons'], function (nainwak, User, Application, buttons) {
    'use strict';

    // TODO: how should we handle that in an AMD setting?
    // maybe with a require.toUrl('.') ?
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptChannel = script.getAttribute('data-channel');

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
            channel: scriptChannel,
            container: window.frames.pub.document.body,
            spyFrame: window.frames.info.frameElement
        });
    }

    return Object.freeze(api);
});
