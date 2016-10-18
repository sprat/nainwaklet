var Page = require('./page');
var analyzePerso = require('../analyzers/perso');

function analyze(doc, date, jeu) {
    var perso = analyzePerso(doc, date);

    jeu.perso = perso;

    return {
        perso: perso
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
