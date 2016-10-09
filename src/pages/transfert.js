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
    var sol = context.objets.sol;
    var inventaire = context.objets.inventaire;
    var objets = sol.concat(inventaire);
    objetEnhancement.enhance(doc, objets, context);
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
