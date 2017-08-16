var Page = require('./page');
var analyzePerso = require('src/analyzers/perso');

function analyze(doc, date, jeu) {
    var perso = analyzePerso(doc, date);

    // TODO: assign?
    jeu.perso = perso;

    return {
        perso: perso
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
