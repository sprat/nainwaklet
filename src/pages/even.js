var assign = require('core-js/library/fn/object/assign');
var Page = require('./page');
var analyzeEvenements = require('../analyzers/evenements');
var analyzePager = require('../analyzers/pager');

function analyze(doc, date, jeu) {
    var evenements = analyzeEvenements(doc, date);
    var pager = analyzePager(doc, date);

    jeu.evenements = evenements;
    if (jeu.perso) {
        assign(jeu.perso, pager);
    }

    return {
        evenements: evenements,
        pager: pager
    };
}

module.exports = Page('even', {
    analyze: analyze,
    fetchParameters: {
        duree: 240,
        type: 'ALL'
    }
});
