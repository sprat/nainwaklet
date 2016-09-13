var bookmarklets = require('./bookmarklets');
var run = require('./run');
var formules = require('./formules.json');

module.exports = Object.freeze({
    initializeBookmarklets: bookmarklets.initialize,
    run: run,
    formules: formules
});
