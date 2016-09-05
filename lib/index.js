var bookmarklets = require('./bookmarklets'),
    run = require('./run'),
    formules = require('./formules.json');

module.exports = Object.freeze({
    initializeBookmarklets: bookmarklets.initialize,
    run: run,
    formules: formules
});
