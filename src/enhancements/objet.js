var calcul = require('../calcul');

function Objet(objet, jeu) {
    var perso = jeu.perso;
    var degats = perso ? calcul.degats(perso, objet) : undefined;

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
