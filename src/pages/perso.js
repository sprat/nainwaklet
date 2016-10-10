var Page = require('./page');
var analyzePerso = require('../analyzers/perso');

function analyze(doc, date, context) {
    return {
        perso: analyzePerso(doc, date, context)
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
