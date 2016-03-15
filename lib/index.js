var User = require('./user'),
    Application = require('./application'),
    Nain = require('./nain'),
    urls = require('./urls'),
    nanylet = require('./nanylet'),
    script = require('./script');

/* Initialize the bookmarklets buttons */
function initializeNanylets(selector, scriptUrl) {
    var buttons = document.querySelectorAll(selector || '.nanylet');

    Array.prototype.forEach.call(buttons, function (button) {
        nanylet.setHref(button, scriptUrl || script.url);
    });
}

function createApplicationOnNainwak(window) {
    var channel = script.getParameter('channel') || 'default',
        ringUpdateUrl = script.getParameter('ring-update-url') || '',
        frames = window.frames,
        pubDoc = frames.pub.document,
        nain = Nain.get(window),
        user = User(nain.nom, nain.image);

    // load the application CSS
    // Note: we never remove it, maybe that's something we should do...
    script.loadCSS(pubDoc);

    // create the application
    return Application({
        user: user,
        channel: channel,
        container: pubDoc.body,
        ringUpdateUrl: ringUpdateUrl
    });
}

// toggle the Application on the Nainwak game page
function runOnNainwak(window) {
    var app = window.nanyApp;

    if (!urls.isGameUrl()) {
        return;
    }

    // if the application is already launched, kill it
    if (app) {
        app.destroy();
        window.nanyApp = undefined;  // can't call "delete" on window in some IE
        return;
    }

    // start the application
    window.nanyApp = createApplicationOnNainwak(window);
}

runOnNainwak(window);

module.exports = Object.freeze({
    initializeNanylets: initializeNanylets
});
