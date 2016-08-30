var bookmarklets = require('./bookmarklets'),
    run = require('./run');

module.exports = Object.freeze({
    initializeBookmarklets: bookmarklets.initialize,
    run: run
});
