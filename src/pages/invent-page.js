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
    var bonnet = context.objets.bonnet;
    var inventaire = context.objets.inventaire;
    var objets = bonnet.concat(inventaire);
    ObjetAnalyzer.enhance(doc, objets, context);
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
