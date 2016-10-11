/* detect page */
var assign = require('core-js/library/fn/object/assign');
var analyzeDetection = require('../analyzers/detection');
var analyzePager = require('../analyzers/pager');
var Page = require('./page');

function analyze(doc, date, context) {
    var detection = analyzeDetection(doc, date);
    var pager = analyzePager(doc, date);

    context.detection = detection;
    if (context.perso) {
        assign(context.perso, pager);
    }

    return {
        detection: detection,
        pager: pager
    };
}

module.exports = Page('detect', {
    analyze: analyze
});
