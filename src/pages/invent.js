var Page = require('./page');
var analyzers = require('../analyzers');
var objetEnhancement = require('./objet-enhancement');

function analyze(doc, date, context) {
    return {
        objets: analyzers.objets(doc, date, context),
        pager: analyzers.pager(doc, date, context)
    };
}

function enhance(doc, context) {
    var bonnet = context.objets.bonnet;
    var inventaire = context.objets.inventaire;
    var objets = bonnet.concat(inventaire);
    objetEnhancement.enhance(doc, objets, context);
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
