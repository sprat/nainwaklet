var Application = require('./application');
var Bookmarklets = require('./bookmarklets');
var formules = require('./formules.json');

//start/stop the Application on the Nainwak game page
function run(config) {
    var app = window.nanyApplication;

    // if the application is already launched, stop it
    if (app) {
        app.destroy();
        window.nanyApplication = undefined;  // can't call "delete" on window in some IE
        return;
    }

    // start the application
    window.nanyApplication = Application(config);
}

module.exports = Object.freeze({
    initializeBookmarklets: Bookmarklets.initialize,
    run: run,
    formules: formules
});
