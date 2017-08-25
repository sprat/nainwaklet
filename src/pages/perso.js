var printHTML = require('print-html');
var Page = require('./page');
var analyzePerso = require('src/analyzers/perso');

function analyze(doc, date, context) {
    var perso = analyzePerso(doc, date);

    // TODO: assign?
    context.perso = perso;

    return {
        perso: perso,
        raw: printHTML(doc)
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
