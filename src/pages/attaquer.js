var Page = require('./page');
var dom = require('../dom');
var Objet = require('../enhancements/objet');
var Box = require('../widgets/box');
var Mounter = require('../mounter');

function enhance(doc, context) {
    var mounter = Mounter();
    var inventaire = context.objets && context.objets.inventaire;
    var idRegex = /javascript:choisir\('(\d+)'\)/i;
    var linkElements = dom.findAll('a', doc);
    var objetsById = {};

    if (!inventaire) {
        return;
    }

    inventaire.forEach(function (objet) {
        objetsById[objet.id] = objet;
    });

    linkElements.forEach(function (link) {
        var element = link.parent();
        var href = link.attr('href');
        var match = idRegex.exec(href);
        var objet;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                mounter.append(element, Box(Objet(objet, context)));
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
