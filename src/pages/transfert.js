var assign = require('core-js/library/fn/object/assign');
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
        pager: pager
    };
}

function findObjetsContainers(doc) {
    var objetsTables = dom.findAll('table', doc);
    return objetsTables.map(function (objetTable) {
        return objetTable.find('.news-text');  // first .news-text td in table
    });
}

function enhance(doc, mounter, context) {
    var sol = context.objets.sol || [];
    var inventaire = context.objets.inventaire || [];
    var objets = sol.concat(inventaire);
    var containers = findObjetsContainers(doc);

    containers.forEach(function (container, index) {
        mounter.prepend(container, Box(Objet(objets[index], context)));
    });
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
