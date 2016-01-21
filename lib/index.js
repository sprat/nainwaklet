var User = require('./user'),
    Application = require('./application'),
    Nain = require('./nain'),
    urls = require('./urls'),
    nanylet = require('./nanylet'),
    css = require('./utils/css'),
    scripts = document.scripts,
    currentScript = scripts[scripts.length - 1];


/* Initialize the bookmarklets buttons */
function initializeNanylets(selector, scriptUrl) {
    var buttons = document.querySelectorAll(selector || '.nanylet');

    // Note: the script src won't work if the module is loaded by an AMD loader
    scriptUrl = scriptUrl || currentScript.src;

    Array.prototype.forEach.call(buttons, function (button) {
        var href = nanylet.generateHref(scriptUrl, button);
        button.setAttribute('href', href);
    });
}

function startApplicationOnNainwak(name, window) {
    var channel = currentScript.getAttribute('data-channel') || 'default',
        ringUpdateUrl = currentScript.getAttribute('data-ring-update-url') || '',
        cssUrl = currentScript.src.replace(/\bjs\b/g, 'css'), // replace 'js' by 'css'
        frames = window.frames,
        pubDoc = frames.pub.document,
        nain = Nain.get(window);

    // insert the CSS file if needed (we never remove it!)
    css.insertLink(cssUrl, pubDoc);

    // create the Hub and assign it to the external api
    window[name] = Application({
        user: User(nain.nom, nain.image),
        channel: channel,
        container: pubDoc.body,
        ringUpdateUrl: ringUpdateUrl
    });
}

// toggle the Application on the Nainwak game page
function runOnNainwak(window) {
    var name = 'nanyApplication',  // global app name
        app = window[name];

    if (!urls.isInGame(window)) {
        return;
    }

    // if the application is already launched, kill it
    if (app) {
        app.destroy();
        window[name] = undefined;  // can't call "delete" on window in some IE
        return;
    }

    // start the application
    startApplicationOnNainwak(name, window);
}

runOnNainwak(window);


module.exports = Object.freeze({
    initializeNanylets: initializeNanylets,
    User: User,
    Application: Application
});
