var Page = require('./page');
var analyzePerso = require('../analyzers/perso');

function analyze(doc, date, context) {
    var perso = analyzePerso(doc, date);

    context.perso = perso;

    return {
        perso: perso
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
