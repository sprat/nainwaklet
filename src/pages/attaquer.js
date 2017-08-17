var Page = require('./page');
var dom = require('src/utilities/dom');
var Objet = require('src/enhancers/objet');
var Box = require('src/enhancers/box');

function enhance(doc, mounter, context) {
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
                mounter.prepend(element, Box(Objet(objet, context)));
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
