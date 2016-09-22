var Page = require('./page');
var Renderer = require('../renderer');
var Analyzer = require('./analyzer');
var Popin = require('./popin');
var Objets = require('./objets');

function enhance(doc, context) {
    var h = Renderer(doc);
    var perso = context.perso;
    var inventaire = context.objets && context.objets.inventaire;
    var idRegex = /javascript:choisir\('(\d+)'\)/i;
    var links = Analyzer.findAll(doc, 'a');
    var objetsById = {};

    if (!inventaire) {
        return;
    }

    inventaire.forEach(function (objet) {
        objetsById[objet.id] = objet;
    });

    links.forEach(function (link) {
        var href = link.href;
        var parent = link.parentNode;
        var match = idRegex.exec(href);
        var objet;
        var objetInfo;
        var popin;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                objetInfo = Objets.ObjetInfo(objet, perso);
                popin = Popin(objetInfo).render(h);
                parent.insertBefore(popin, parent.firstChild);
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
