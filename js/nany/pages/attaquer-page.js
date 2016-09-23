var Page = require('./page');
var Dom = require('../dom');
var Renderer = require('../renderer');
var Popin = require('./popin');
var Objets = require('./objets');

function enhance(doc, context) {
    var h = Renderer(doc);
    var perso = context.perso;
    var inventaire = context.objets && context.objets.inventaire;
    var idRegex = /javascript:choisir\('(\d+)'\)/i;
    var linkElements = Dom.findAll('a', doc);
    var objetsById = {};

    if (!inventaire) {
        return;
    }

    inventaire.forEach(function (objet) {
        objetsById[objet.id] = objet;
    });

    linkElements.forEach(function (link) {
        var href = link.attr('href');
        var parent = link.parent();
        var match = idRegex.exec(href);
        var objet;
        var objetInfo;
        var popin;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                objetInfo = Objets.ObjetInfo(objet, perso);
                popin = Popin(objetInfo).render(h);
                parent.prepend(popin);
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
