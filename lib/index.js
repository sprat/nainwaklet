var User = require('./user'),
    Application = require('./application'),
    Nain = require('./nain'),
    urls = require('./urls'),
    nanylet = require('./nanylet'),
    appName = 'nanyApplication',
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

function loadApplicationCSS(doc) {
    // take the current script URL and replace the .js extension by .css
    var url = currentScript.src.replace(/\bjs\b/g, 'css'),
        linkId = appName + 'CSS',
        link = doc.getElementById(linkId),
        head = doc.getElementsByTagName('head')[0];

    // insert the CSS file if needed (we never remove it!)
    if (!link) {
        link = doc.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        link.setAttribute('id', linkId);
        head.appendChild(link);
    }
}

function createApplicationOnNainwak(window) {
    var channel = currentScript.getAttribute('data-channel') || 'default',
        ringUpdateUrl = currentScript.getAttribute('data-ring-update-url') || '',
        frames = window.frames,
        pubDoc = frames.pub.document,
        nain = Nain.get(window),
        user = User(nain.nom, nain.image);

    // load the application CSS
    // Note: we never remove it, maybe that's something we should do...
    loadApplicationCSS(pubDoc);

    // create the Hub and assign it to the external api
    return Application({
        user: user,
        channel: channel,
        container: pubDoc.body,
        ringUpdateUrl: ringUpdateUrl
    });
}

// toggle the Application on the Nainwak game page
function runOnNainwak(window) {
    var app = window[appName];

    if (!urls.isGameUrl()) {
        return;
    }

    // if the application is already launched, kill it
    if (app) {
        app.destroy();
        window[appName] = undefined;  // can't call "delete" on window in some IE
        return;
    }

    // start the application
    window[appName] = app = createApplicationOnNainwak(window);
}

runOnNainwak(window);


module.exports = Object.freeze({
    initializeNanylets: initializeNanylets,
    User: User,
    Application: Application
});
