var assign = require('core-js/library/fn/object/assign');
var Page = require('./page');
var calcul = require('../calcul');
var dom = require('../dom');
var analyzeObjets = require('../analyzers/objets');
var analyzePager = require('../analyzers/pager');
var Objet = require('../enhancements/objet');
var Box = require('../widgets/box');
var Mounter = require('../mounter');

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

function findObjetsContainers(doc) {
    var objetsTables = dom.findAll('table', doc);
    return objetsTables.map(function (objetTable) {
        return objetTable.find('.news-text');  // first .news-text td in table
    });
}

function enhance(doc, context) {
    var mounter = Mounter();
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
