/* detect page */
var Page = require('./page');
var analyzeDetection = require('../analyzers/detection');
var analyzePager = require('../analyzers/pager');

function analyze(doc, date, context) {
    return {
        detection: analyzeDetection(doc, date, context),
        pager: analyzePager(doc, date, context)
    };
}

module.exports = Page('detect', {
    analyze: analyze
});
