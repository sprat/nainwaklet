var dom = require('../dom');
var Mounter = require('../mounter');
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

function enhanceObjets(doc, objets, context) {
    // add an info box inside each objet's table
    var mounter = Mounter();
    var objetsTables = dom.findAll('table', doc);
    objetsTables.forEach(function (objetTable, index) {
        var container = objetTable.findAll('.news-text').pop();  // last .news-text td in table
        var objet = objets[index];
        var objetInfo = ObjetInfo(objet, context.perso);
        mounter.append(container, objetInfo);
    });
}

module.exports = {
    enhanceObjets: enhanceObjets,
    ObjetInfo: ObjetInfo
};
