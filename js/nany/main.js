define(['./user', './application', './nanylet', './nainwak', 'utils/assert', 'utils/unset', 'utils/css', 'utils/url'], function (User, Application, nanylet, nainwak, assert, unset, css, url) {
    'use strict';

    var scripts = document.scripts,
        script = scripts[scripts.length - 1],
        scriptUrl = (script && script.src) ? script.src : getScriptUrlWithRequire(),
        cssUrl = scriptUrl.replace(/\bjs\b/g, 'css'), // replace 'js' by 'css'
        channel = script.getAttribute('data-channel') || 'default';

    function getScriptUrlWithRequire() {
        var relativeUrl = require.toUrl('nany.min.js');
        return url.normalize(relativeUrl);
    }

    /* Initialize the bookmarklets buttons */
    function initializeNanylets(selector) {
        var buttons = document.querySelectorAll(selector || '.nanylet');

        Array.prototype.forEach.call(buttons, function (button) {
            var channel = button.getAttribute('data-channel'),
                href = nanylet.generateHref(scriptUrl, channel);
            button.setAttribute('href', href);
        });
    }

    function startApplicationOnNainwak(name, window) {
        var frames = window.frames,
            pubDoc = frames.pub.document,
            infoFrame = frames.info.frameElement,
            nain = nainwak.getNain(window);

        // insert the CSS file if needed (we never remove it!)
        css.insertLink(cssUrl, pubDoc);

        // create the Hub and assign it to the external api
        window[name] = Application({
            user: User(nain.nom, nain.image),
            channel: channel,
            container: pubDoc.body,
            infoFrame: infoFrame
        });
    }

    // toggle the Application on the Nainwak game page
    function runOnNainwak(window) {
        var name = 'nanyApplication',  // global app name
            app = window[name];

        if (!nainwak.isInGame(window)) {
            return;
        }

        // if the application is already launched, kill it
        if (app) {
            app.destroy();
            unset(window, name);
            return;
        }

        // start the application
        startApplicationOnNainwak(name, window);
    }

    runOnNainwak(window);

    return Object.freeze({
        initializeNanylets: initializeNanylets,
        User: User,
        Application: Application
    });
});
