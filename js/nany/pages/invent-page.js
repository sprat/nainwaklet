var Page = require('./page'),
    analyzer = require('./analyzer'),
    pager = require('./pager'),
    objets = require('./objets'),
    Renderer = require('../renderer'),
    loadCSS = require('../load-css'),
    calcul = require('../calcul');

function analyze(doc, date, context) {
    var js = analyzer.getJS(doc);

    return {
        objets: objets.analyze(js, context),
        pager: pager.analyze(js, context)
    };
}

function renderPopin(h, content) {
    return h('.nany.popin', [
        h('button.popin-button', '?'),
        h('.popin-box', content)
    ]);
}

function createInfoPopin(h, context, index) {
    var objets = context.objets.bonnet.concat(context.objets.inventaire),
        objet = objets[index],
        perso = context.perso,
        isArme = objet.type === 'arme',
        degats = (isArme && perso) ? calcul.degats(perso, objet) : undefined,
        content;

    if (degats) {
        content = h('.degats', 'Dégâts : entre ' + degats.minimum + ' et ' + degats.maximum);
        return renderPopin(h, content);
    }
}

function enhance(doc, context) {
    var renderer = Renderer(doc),
        titles = analyzer.findAll(doc, 'td.news-titre');

    // load the CSS
    loadCSS(doc);

    // add an advisor box on each title
    titles.forEach(function (title, index) {
        var popin = createInfoPopin(renderer, context, index);

        if (popin) {
            title.appendChild(popin);
        }
    });
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
