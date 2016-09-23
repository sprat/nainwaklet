var Page = require('./page');
var Dom = require('../dom');
var Pager = require('./pager');
var Objets = require('./objets');

function analyze(doc, date, context) {
    var js = Dom.inlineJS(doc);

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
