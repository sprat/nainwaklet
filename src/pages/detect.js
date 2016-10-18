var assign = require('core-js/library/fn/object/assign');
var Page = require('./page');
var analyzeDetection = require('../analyzers/detection');
var analyzePager = require('../analyzers/pager');

function analyze(doc, date, jeu) {
    var detection = analyzeDetection(doc, date);
    var pager = analyzePager(doc, date);

    jeu.detection = detection;
    if (jeu.perso) {
        assign(jeu.perso, pager);
    }

    return {
        detection: detection,
        pager: pager
    };
}

module.exports = Page('detect', {
    analyze: analyze
});
