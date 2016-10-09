/* detect page */
var Page = require('./page');
var analyzers = require('../analyzers');

function analyze(doc, date, context) {
    return {
        detection: analyzers.detection(doc, date, context),
        pager: analyzers.pager(doc, date, context)
    };
}

module.exports = Page('detect', {
    analyze: analyze
});
