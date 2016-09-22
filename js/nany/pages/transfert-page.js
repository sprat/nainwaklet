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
    var sol = context.objets.sol;
    var inventaire = context.objets.inventaire;
    var objets = sol.concat(inventaire);
    Objets.enhance(doc, objets, context.perso);
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
