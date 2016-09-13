var Page = require('./page');
var Renderer = require('../renderer');
var analyzer = require('./analyzer');
var objets = require('./objets');

function enhance(doc, context) {
    var h = Renderer(doc);
    var perso = context.perso;
    var inventaire = context.objets && context.objets.inventaire;
    var idRegex = /javascript:choisir\('(\d+)'\)/i;
    var links = analyzer.findAll(doc, 'a');
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
        var popin;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                popin = objets.createInfoPopin(h, objet, perso);
                parent.insertBefore(popin, parent.firstChild);
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
