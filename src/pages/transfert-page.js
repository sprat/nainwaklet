var Page = require('./page');
var Dom = require('../dom');
var PagerAnalyzer = require('./pager-analyzer');
var ObjetAnalyzer = require('./objet-analyzer');

function analyze(doc, date, context) {
    var js = Dom.inlineJS(doc);

    return {
        objets: ObjetAnalyzer.analyze(js, context),
        pager: PagerAnalyzer.analyze(js, context)
    };
}

function enhance(doc, context) {
    var sol = context.objets.sol;
    var inventaire = context.objets.inventaire;
    var objets = sol.concat(inventaire);
    ObjetAnalyzer.enhance(doc, objets, context);
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
