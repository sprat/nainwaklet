var Objet = require('./objet');

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

module.exports = Formule;
