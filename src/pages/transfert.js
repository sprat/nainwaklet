var assign = require('core-js/library/fn/object/assign');
var printHTML = require('print-html');
var Page = require('./page');
var nainwak = require('src/nainwak');
var dom = require('src/utilities/dom');
var objetsAnalyzer = require('src/analyzers/objets');
var analyzePager = require('src/analyzers/pager');
var Objet = require('src/enhancers/objet');
var Box = require('src/enhancers/box');

function analyze(doc, date, context) {
    var objets = objetsAnalyzer.analyzeDocument(doc, date);
    var pager = analyzePager(doc, date);

    context.objets = context.objets || {};
    assign(context.objets, objets);

    if (context.perso) {
        // update the 'perso' bonus data according to the objects in 'inventaire'
        var bonuses = nainwak.bonusObjets(context.objets.inventaire);
        assign(context.perso, bonuses);
        assign(context.perso, pager);
    }

    return {
        objets: objets,
        pager: pager,
        raw: printHTML(doc)
    };
}

function enhance(doc, mounter, context) {
    var actionLinks = dom.findAll('a[href*="action"]', doc);

    actionLinks.forEach(function (actionLink) {
        var container = actionLink.parent().node;
        var objet = objetsAnalyzer.analyzeActionLink(actionLink, context);
        if (objet) {
            mounter.prepend(container, Box(Objet(objet, context)));
        }
    });
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
