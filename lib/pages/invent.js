var Page = require('./page'),
    analyzer = require('./analyzer'),
    Renderer = require('../renderer'),
    script = require('../script'),
    calcul = require('../calcul');

function analyze(doc) {
    var js = analyzer.getJS(doc),
        inventaire = analyzer.getInventaire(js),
        pager = analyzer.getPager(js);

    return {
        inventaire: inventaire,
        pager: pager
    };
}

function renderPopin(h, content) {
    return h('.nany.popin', [
        h('button.popin-button', '?'),
        h('.popin-box', content)
    ]);
}

function createInfoPopin(h, infos, index) {
    var objet = infos.inventaire[index],
        perso = infos.perso,
        isArme = objet.type === 'arme',
        degats = (isArme && perso) ? calcul.degats(perso, objet) : undefined,
        content;

    if (degats) {
        content = h('.degats', 'Dégâts : entre ' + degats.minimum + ' et ' + degats.maximum);
        return renderPopin(h, content);
    }
}

function enhance(doc, infos) {
    var renderer = Renderer(doc),
        titles = analyzer.findAll(doc, 'td.news-titre');

    // load the CSS
    script.loadCSS(doc);

    // add an advisor box on each title
    titles.forEach(function (title, index) {
        var popin = createInfoPopin(renderer, infos, index);

        if (popin) {
            title.appendChild(popin);
        }
    });
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
