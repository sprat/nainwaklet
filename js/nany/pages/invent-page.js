var Page = require('./page');
var Analyzer = require('./analyzer');
var Pager = require('./pager');
var Objets = require('./objets');

function analyze(doc, date, context) {
    var js = Analyzer.getJS(doc);

    return {
        objets: Objets.analyze(js, context),
        pager: Pager.analyze(js, context)
    };
}

function enhance(doc, context) {
    var bonnet = context.objets.bonnet;
    var inventaire = context.objets.inventaire;
    var objets = bonnet.concat(inventaire);
    Objets.enhance(doc, objets, context.perso);
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
