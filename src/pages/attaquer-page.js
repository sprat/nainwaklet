var Page = require('./page');
var dom = require('../dom');
var Mounter = require('../mounter');
var Popin = require('../popin');
var objetAnalyzer = require('./objet-analyzer');

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
        var popin;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                objetInfo = objetAnalyzer.ObjetInfo(objet, perso);
                popin = Popin('?', objetInfo);
                mounter.prepend(link.parent(), popin);
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
