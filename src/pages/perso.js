var Page = require('./page');
var analyzePerso = require('src/analyzers/perso');

function analyze(doc, date, context) {
    var perso = analyzePerso(doc, date);

    // TODO: assign?
    context.perso = perso;

    return {
        perso: perso
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
