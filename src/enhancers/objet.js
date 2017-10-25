var nainwak = require('src/nainwak');

function Objet(objet, context) {
    var perso = context.perso;
    var degats = perso ? nainwak.degats(perso, objet) : undefined;

    function render(h) {
        var lines = [];

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
