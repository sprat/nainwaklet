var Application = require('./application');
var Bookmarklets = require('./bookmarklets');
var Dom = require('./dom');
var Formules = require('./formules');


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

function replaceNodeByComponent(component) {
    var mounter = Dom.Mounter();
    return function (node) {
        mounter.replace(node, component);
    };
}

module.exports = Object.freeze({
    run: run,
    initializeBookmarklets: Bookmarklets.initialize,
    afficheFormules: replaceNodeByComponent(Formules)
});
