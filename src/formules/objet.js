var nainwak = require('../nainwak');
var styles = require('./objet.css');

function Objet(nom, image, quantite, id, note) {
    function render(h) {
        var title = nom;

        if (note) {
            title += ' ' + note;
        }

        if (id) {
            title += ' (id: ' + id + ')';
        }

        var img = h('img', {
            class: styles.image,
            src: nainwak.url + image,
            title: title
        });

        var content = [img];

        if (quantite > 1) {
            content.push(' ');
            content.push(h('span', { class: styles.quantite }, 'x ' + quantite));
        }

        return h('div', { class: styles.objet }, content);
    }

    return {
        render: render
    };
}

Objet.fromJSON = function (json) {
    return Objet(json.nom, json.image, json.quantite, json.id, json.note);
};

module.exports = Objet;
