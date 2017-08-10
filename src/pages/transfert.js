var assign = require('core-js/library/fn/object/assign');
var Page = require('./page');
var nainwak = require('src/nainwak');
var dom = require('src/utilities/dom');
var analyzeObjets = require('src/analyzers/objets');
var analyzePager = require('src/analyzers/pager');
var Objet = require('src/enhancers/objet');
var Box = require('src/enhancers/box');
var Mounter = require('src/utilities/mounter');

function analyze(doc, date, jeu) {
    var objets = analyzeObjets(doc, date);
    var pager = analyzePager(doc, date);

    jeu.objets = jeu.objets || {};
    assign(jeu.objets, objets);

    // update the 'perso' bonus data according to the objects in 'inventaire'
    if (jeu.perso) {
        var bonuses = nainwak.bonusObjets(jeu.objets.inventaire);
        assign(jeu.perso, bonuses);
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

function enhance(doc, jeu) {
    var mounter = Mounter();
    var sol = jeu.objets.sol || [];
    var inventaire = jeu.objets.inventaire || [];
    var objets = sol.concat(inventaire);
    var containers = findObjetsContainers(doc);

    containers.forEach(function (container, index) {
        mounter.prepend(container, Box(Objet(objets[index], jeu)));
    });
}

module.exports = Page('transfert', {
    analyze: analyze,
    enhance: enhance
});
