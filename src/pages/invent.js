var assign = require('core-js/library/fn/object/assign');
var Page = require('./page');
var analyzeObjets = require('../analyzers/objets');
var analyzePager = require('../analyzers/pager');
var calcul = require('../calcul');
var enhancements = require('./enhancements');

function analyze(doc, date, context) {
    var objets = analyzeObjets(doc, date);
    var pager = analyzePager(doc, date);

    context.objets = context.objets || {};
    assign(context.objets, objets);

    // update the 'perso' bonus data according to the objects in 'inventaire'
    if (context.perso) {
        var bonuses = calcul.bonusObjets(context.objets.inventaire);
        assign(context.perso, bonuses);
    }

    return {
        objets: objets,
        pager: pager
    };
}

function enhance(doc, context) {
    var bonnet = context.objets.bonnet || [];
    var inventaire = context.objets.inventaire || [];
    var objets = bonnet.concat(inventaire);
    enhancements.enhanceObjets(doc, objets, context);
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
