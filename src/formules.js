var formulesJSON = require('./formules.json');
var Urls = require('./urls');
require('./formules.css');

function Formules(formules) {
    // TODO: add a search feature in another component/render function maybe? / we need a function filterByText(text) => Formules
    // TODO: show the available formules for an objet in the inventaire/detection pages? / we need a function filterByIngredient(objet) => Formules
    var maxIngredients = getMaxCount('nbIngredients');
    var maxResultats = getMaxCount('nbResultats');

    function getMaxCount(property) {
        return formules.reduce(function (current, formule) {
            return Math.max(current, formule[property]);
        }, 0);
    }

    function render(h) {
        return h('table.nany.nany-formules', [
            h('thead', [
                h('tr', [
                    h('th', 'N°'),
                    h('th', 'Nom'),
                    h('th', { colspan: String(maxResultats) }, 'Résultats'),
                    h('th', { colspan: String(maxIngredients) }, 'Ingrédients')
                ])
            ]),
            h('tbody', formules.map(function (formule) {
                return formule.render(h, maxIngredients, maxResultats);
            }))
        ]);
    }

    return {
        render: render
    };
}

Formules.fromJSON = function(json) {
    var formules = json.map(Formule.fromJSON);
    return Formules(formules);
};

function Formule(id, nom, ingredients, resultats) {
    function render(h, maxIngredients, maxResultats) {
        var cells = [];

        function addCell(content) {
            cells.push(h('td', content));
        }

        function addEmptyCells(n) {
            for (; n > 0; n -= 1) {
                addCell('');
            }
        }

        addCell(id);
        addCell(nom || '?');

        resultats.forEach(function (objet) {
            addCell(objet.render(h));
        });

        addEmptyCells(maxResultats - resultats.length);

        ingredients.forEach(function (objet) {
            addCell(objet.render(h));
        });

        addEmptyCells(maxIngredients - ingredients.length);

        return h('tr', { key: id }, cells);
    }

    return {
        nbIngredients: ingredients.length,
        nbResultats: resultats.length,
        render: render
    };
}

Formule.fromJSON = function (json) {
    var resultats = json.resultats || [];
    var ingredients = json.ingredients || [];

    resultats = resultats.map(Objet.fromJSON);
    ingredients = ingredients.map(Objet.fromJSON);

    return Formule(json.id, json.nom, ingredients, resultats);
};

function Objet(nom, image, quantite, id, note) {
    function render(h) {
        var title = nom;

        if (note) {
            title += ' ' + note;
        }

        if (id) {
            title += ' (id: ' + id + ')';
        }

        var img = h('img.image', {
            src: Urls.nainwakUrl + image,
            title: title
        });

        var content = [img];

        if (quantite > 1) {
            content.push(' ');
            content.push(h('span.quantite', 'x ' + quantite));
        }

        return h('div.objet', content);
    }

    return {
        render: render
    };
}

Objet.fromJSON = function (json) {
    return Objet(json.nom, json.image, json.quantite, json.id, json.note);
};

module.exports = Formules.fromJSON(formulesJSON);
