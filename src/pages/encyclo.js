var printHTML = require('print-html');
var Page = require('./page');
var encycloAnalyzer = require('src/analyzers/encyclo');

function analyze(doc, date, context) {
    var listDocument = encycloAnalyzer.getListDocument(doc);
    var encyclo = encycloAnalyzer.analyzeListDocument(listDocument);

    context.encyclo = encyclo;

    return {
        encyclo: encyclo,
        raw: printHTML(listDocument)
    };
}

module.exports = Page('encyclo', {
    analyze: analyze
});
