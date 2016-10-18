var Page = require('./page');
var dom = require('../dom');
var Objet = require('../enhancements/objet');
var Box = require('../widgets/box');
var Mounter = require('../mounter');

function enhance(doc, jeu) {
    var mounter = Mounter();
    var inventaire = jeu.objets && jeu.objets.inventaire;
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
                mounter.prepend(element, Box(Objet(objet, jeu)));
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
