var Application = require('./application'),
    urls = require('./urls'),
    bookmarklets = require('./bookmarklets');

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
    initializeBookmarklets: bookmarklets.initialize
});
