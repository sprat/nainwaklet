var array = require('core-js/library/fn/array');
var Application = require('src/application');
var Bookmarklet = require('src/bookmarklet');
var Mounter = require('src/utilities/mounter');
var formules = require('src/formules');
var mounter = Mounter();

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

function addComponent(createComponent) {
    return function (selector/*, ...args*/) {
        var args = array.from(arguments).slice(1);
        var node = document.querySelector(selector);
        mounter.append(node, createComponent.apply(null, args));
    };
}

module.exports = Object.freeze({
    run: run,
    addBookmarklet: addComponent(Bookmarklet),
    addFormules: addComponent(function() { return formules; })
});
