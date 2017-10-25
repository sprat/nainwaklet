var nainwak = require('src/nainwak');

function Objet(objet, context) {
    var perso = context.perso;
    var degats = perso ? nainwak.degats(perso, objet) : undefined;
    var etat = objet.nom == 'Main collante de gosse' ? { valeur: objet.PV, maximum: objet.PVmax } : undefined;

    function render(h) {
        var lines = [];

        if (etat) {
            lines.push(h('div', [
                h('b', 'Etat : '),
                etat.valeur,
                '/',
                etat.maximum
            ]));
        }

        if (degats) {
            lines.push(h('div', [
                h('b', 'Dégâts : '),
                degats.minimum,
                ' à ',
                degats.maximum
            ]));
        }

        return lines;
    }

    return {
        render: render
    };
}

module.exports = Objet;
