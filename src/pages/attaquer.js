var Page = require('./page');
var dom = require('../dom');
var Mounter = require('../mounter');
var enhancements = require('./enhancements');

function enhance(doc, context) {
    var mounter = Mounter();
    var perso = context.perso;
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
        var href = link.attr('href');
        var match = idRegex.exec(href);
        var objet;
        var objetInfo;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                objetInfo = enhancements.ObjetInfo(objet, perso);
                mounter.append(link.parent(), objetInfo);
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
