/* Module API */
define(['./user', './application', './bookmarklets', './nainwak', './settings', 'utils/css'], function (User, Application, bookmarklets, nainwak, settings, css) {
    'use strict';

    function unset(obj, key) {
        try {
            delete obj[key];
        } catch (e) {
            obj[key] = undefined;
        }
    }

    function toggleApp(window) {
        var name = 'nanyApplication',  // global app name
            app = window[name];

        // if the application is already launched, kill it
        if (app) {
            app.destroy();
            unset(window, name);
            return;
        }

        // start the application
        var frames = window.frames,
            pubDoc = frames.pub.document,
            infoFrame = frames.info.frameElement,
            nain = nainwak.getNain(window);

        // insert the CSS file if needed (we never remove it!)
        css.insertLink(settings.cssUrl, pubDoc);

        // create the Hub and assign it to the external api
        window[name] = Application({
            user: User(nain.nom, nain.image),
            channel: settings.channel,
            container: pubDoc.body,
            infoFrame: infoFrame
        });
    }

    // toggle the Application on the Nainwak game page
    function runOnNainwak() {
        if (nainwak.isInGame(window)) {
            toggleApp(window);
        }
    }

    runOnNainwak();

    return Object.freeze({
        initBookmarklets: bookmarklets.initialize,
        User: User,
        Application: Application
    });
});
