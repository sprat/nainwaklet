var assign = require('core-js/library/fn/object/assign');
var Page = require('./page');
var analyzeDetection = require('src/analyzers/detection');
var analyzePager = require('src/analyzers/pager');

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
