var styles = require('./formules.css');
var Formule = require('./formule.js');

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
        return h('table', { class: styles.formules }, [
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

module.exports = Formules;
