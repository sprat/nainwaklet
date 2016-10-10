var Page = require('./page');
var analyzeObjets = require('../analyzers/objets');
var analyzePager = require('../analyzers/pager');
var objetEnhancement = require('./objet-enhancement');

function analyze(doc, date, context) {
    return {
        objets: analyzeObjets(doc, date, context),
        pager: analyzePager(doc, date, context)
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
