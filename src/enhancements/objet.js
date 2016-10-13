var dom = require('../dom');
var calcul = require('../calcul');

function Objet(objet, context) {
    var perso = context.perso;
    var isArme = objet.type === 'arme';
    var degats = (isArme && perso) ? calcul.degats(perso, objet) : undefined;

    function render(h) {
        if (degats) {
            return h('div', 'Dégâts : entre ' + degats.minimum + ' et ' + degats.maximum);
        }
    }

    return {
        render: render
    };
}

Objet.findContainers = function(doc) {
    var objetsTables = dom.findAll('table', doc);
    return objetsTables.map(function (objetTable) {
        return objetTable.findAll('.news-text').pop();  // last .news-text td in table
    });
};

module.exports = Objet;
