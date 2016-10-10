var Page = require('./page');
var analyzeEvenements = require('../analyzers/evenements');
var analyzePager = require('../analyzers/pager');

function analyze(doc, date, context) {
    return {
        evenements: analyzeEvenements(doc, date, context),
        pager: analyzePager(doc, date, context)
    };
}

module.exports = Page('even', {
    analyze: analyze,
    fetchParameters: {
        duree: 240,
        type: 'ALL'
    }
});
