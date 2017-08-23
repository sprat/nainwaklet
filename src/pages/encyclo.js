var Page = require('./page');
var analyzeEncyclo = require('src/analyzers/encyclo');

function analyze(doc, date, context) {
    var encyclo = analyzeEncyclo(doc, date);

    context.encyclo = encyclo;

    return {
        encyclo: encyclo
    };
}

module.exports = Page('encyclo', {
    analyze: analyze
});
