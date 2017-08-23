var Page = require('./page');
var encycloAnalyzer = require('src/analyzers/encyclo');

function analyze(doc, date, context) {
    var listDocument = encycloAnalyzer.getListFrameDocument(doc);
    var encyclo = encycloAnalyzer.analyzeListFrameDocument(listDocument);

    context.encyclo = encyclo;

    return {
        encyclo: encyclo
    };
}

module.exports = Page('encyclo', {
    analyze: analyze
});
