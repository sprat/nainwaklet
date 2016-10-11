var Page = require('./page');
var dom = require('../dom');
var Mounter = require('../mounter');
var TooltipButton = require('../widgets/tooltip-button');
var objetEnhancement = require('./objet-enhancement');

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
        var tooltipButton;

        if (match) {
            objet = objetsById[match[1]];
            if (objet) {
                objetInfo = objetEnhancement.ObjetInfo(objet, perso);
                tooltipButton = TooltipButton('?', objetInfo);
                mounter.prepend(link.parent(), tooltipButton);
            }
        }
    });
}

module.exports = Page('attaquer', {
    enhance: enhance
});
