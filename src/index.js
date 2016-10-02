var Application = require('./application');
var bookmarklet = require('./bookmarklet');
var Mounter = require('./mounter');
var Formules = require('./formules');


// start/stop the Application on the Nainwak game page
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

function replaceNodeByComponent(component) {
    var mounter = Mounter();
    return function (node) {
        mounter.replace(node, component);
    };
}

module.exports = Object.freeze({
    run: run,
    initializeBookmarklets: bookmarklet.initialize,
    afficheFormules: replaceNodeByComponent(Formules)
});
