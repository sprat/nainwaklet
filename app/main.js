/* main entry point */
define(['./nainwak', './user', './app', './bookmarklet'], function (nainwak, createUser, createApplication, bookmarklet) {
    'use strict';

    // TODO: how should we handle that in an AMD setting?
    // maybe with a require.toUrl('.') ?
    var script = document.scripts[document.scripts.length - 1],
        scriptUrl = script.src,
        scriptChannel = script.getAttribute('data-channel');

    // module public API
    var api = {
        createUser: createUser,
        createApplication: createApplication,
        initializeButtons: function(buttons) {
            bookmarklet.initialize(scriptUrl, buttons);
        }
    };

    // create an application object if we are in the Nainwak game page
    if (nainwak.isInGame(window)) {
        api.app = createApplication({
            user: nainwak.getUser(window),
            channel: scriptChannel,
            container: window.frames.pub.document.body,
            spyFrame: window.frames.info.frameElement
        });
    }

    return Object.freeze(api);
});
