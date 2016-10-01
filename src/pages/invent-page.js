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
    var bonnet = context.objets.bonnet;
    var inventaire = context.objets.inventaire;
    var objets = bonnet.concat(inventaire);
    objetAnalyzer.enhance(doc, objets, context);
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
