var Page = require('./page'),
    Renderer = require('../renderer'),
    analyzer = require('./analyzer'),
    objets = require('./objets');

function enhance(doc, context) {
    var h = Renderer(doc),
        perso = context.perso,
        inventaire = context.objets && context.objets.inventaire,
        idRegex = /javascript:choisir\('(\d+)'\)/i,
        links = analyzer.findAll(doc, 'a'),
        objetsById = {};

    if (!inventaire) {
        return;
    }

    inventaire.forEach(function (objet) {
        objetsById[objet.id] = objet;
    });

    links.forEach(function (link) {
        var href = link.href,
            parent = link.parentNode,
            match = idRegex.exec(href),
            objet,
            popin;

        if (match) {
            objet = objetsById[match[1]];
            console.log(match[1]);
            console.log(objet);
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
