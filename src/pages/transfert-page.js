var Page = require('./page');
var dom = require('../dom');
var pagerAnalyzer = require('./pager-analyzer');
var objetAnalyzer = require('./objet-analyzer');

function analyze(doc, date, context) {
    var js = dom.getInlineJavascript(doc);

    return {
        objets: objetAnalyzer.analyze(js, context),
        pager: pagerAnalyzer.analyze(js, context)
    };
}

function enhance(doc, context) {
    var sol = context.objets.sol;
    var inventaire = context.objets.inventaire;
    var objets = sol.concat(inventaire);
    objetAnalyzer.enhance(doc, objets, context);
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
