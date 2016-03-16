var Application = require('./application'),
    script = require('./script'),
    urls = require('./urls'),
    nanylet = require('./nanylet');

// Initialize the bookmarklets buttons
function initializeNanylets(selector, scriptUrl) {
    var buttons = document.querySelectorAll(selector || '.nanylet');

    Array.prototype.forEach.call(buttons, function (button) {
        nanylet.setHref(button, scriptUrl || script.url);
    });
}

// Toggle the Application on the Nainwak game page
function runOnNainwak() {
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
    window.nanyApp = Application();
}

runOnNainwak();

module.exports = Object.freeze({
    initializeNanylets: initializeNanylets
});
