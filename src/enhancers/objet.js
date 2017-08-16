var nainwak = require('src/nainwak');

function Objet(objet, context) {
    var perso = context.perso;
    var degats = perso ? nainwak.degats(perso, objet) : undefined;

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
