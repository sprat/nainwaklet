var Page = require('./page'),
    analyzer = require('./analyzer'),
    pager = require('./pager'),
    objets = require('./objets'),
    Renderer = require('../renderer'),
    loadCSS = require('../load-css'),
    calcul = require('../calcul');

function analyze(doc) {
    var js = analyzer.getJS(doc),
        objetsData = objets.analyze(js);

    return {
        bonnet: objetsData.bonnet,
        inventaire: objetsData.inventaire,
        pager: pager.analyze(js)
    };
}

function renderPopin(h, content) {
    return h('.nany.popin', [
        h('button.popin-button', '?'),
        h('.popin-box', content)
    ]);
}

function createInfoPopin(h, infos, index) {
    var objets = infos.bonnet.concat(infos.inventaire),
        objet = objets[index],
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
    loadCSS(doc);

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
