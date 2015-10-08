/* Module API */
define(['./user', './application', './bookmarklets', './nainwak', './settings', 'utils/css'], function (User, Application, bookmarklets, nainwak, settings, css) {
    'use strict';

    var module = {
        initBookmarklets: bookmarklets.initialize,
        User: User,
        Application: Application
    };

    // create an Application running on the Nainwak game
    function runOnNainwak() {
        if (!nainwak.isInGame(window)) {
            return;
        }

        var pubDoc = window.frames.pub.document,
            infoFrame = window.frames.info.frameElement,
            nain = nainwak.getNain(window);

        // insert the CSS file if needed (we never remove it!)
        css.insertLink(settings.cssUrl, pubDoc);

        // create the Hub and assign it to the external api
        module.app = Application({
            user: User(nain.nom, nain.image),
            channel: settings.channel,
            container: pubDoc.body,
            infoFrame: infoFrame
        });
    }

    runOnNainwak();

    return module;
});
