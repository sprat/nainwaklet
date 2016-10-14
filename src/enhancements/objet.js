var calcul = require('../calcul');

function Objet(objet, context) {
    var perso = context.perso;
    var isArme = objet.type === 'arme';
    var degats = (isArme && perso) ? calcul.degats(perso, objet) : undefined;

    function render(h) {
        if (degats) {
            return h('div', h('b', 'Dégâts :'), ' entre ' + degats.minimum + ' et ' + degats.maximum);
        }
    }

    return {
        render: render
    };
}

module.exports = Objet;
