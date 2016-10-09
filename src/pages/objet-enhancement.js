var dom = require('../dom');
var Mounter = require('../mounter');
var TooltipButton = require('../tooltip-button');
var calcul = require('../calcul');

function ObjetInfo(objet, perso) {
    var isArme = objet.type === 'arme';
    var degats = (isArme && perso) ? calcul.degats(perso, objet) : undefined;

    function render(h) {
        if (degats) {
            return h('div', 'Dégâts : entre ' + degats.minimum + ' et ' + degats.maximum);  // { class: styles.degats }
        }
    }

    return {
        render: render
    };
}

function enhance(doc, objets, context) {
    var mounter = Mounter();
    var imageElements = dom.findAll('td.news-text img', doc);

    // add an advisor box on each title
    imageElements.forEach(function (image, index) {
        var objet = objets[index];
        var objetInfo = ObjetInfo(objet, context.perso);
        var tooltipButton = TooltipButton('?', objetInfo);
        mounter.prepend(image.parent(), tooltipButton);
    });
}

module.exports = {
    enhance: enhance,
    ObjetInfo: ObjetInfo
};
