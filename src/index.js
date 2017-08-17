var array = require('core-js/library/fn/array');
var Application = require('src/application');
var Bookmarklet = require('src/bookmarklet');
var Mounter = require('src/utilities/mounter');
var formules = require('src/formules');

// start/stop the Application on the Nainwak game page
function runInGame(config) {
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

function mountComponent(name, createComponent) {
    var mounter = Mounter(name);
    return function (selector/*, ...args*/) {
        var args = array.from(arguments).slice(1);
        var node = document.querySelector(selector);
        mounter.append(node, createComponent.apply(null, args));
    };
}

module.exports = Object.freeze({
    runInGame: runInGame,
    addBookmarklet: mountComponent('nany:bookmarklet', Bookmarklet),
    addFormules: mountComponent('nany:formules', function() { return formules; })
});
