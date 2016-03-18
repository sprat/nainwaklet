var Page = require('./page'),
    analyzer = require('./analyzer'),
    int = analyzer.int,
    Renderer = require('../renderer'),
    urls = require('../urls'),
    script = require('../script'),
    calcul = require('../calcul');

function getInventaire(js) {
    var regex = /mip\((.*)\);/ig,
        keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);

    //model: 'bonnet', 'poser', 'encyclo', 'ramasser', 'fee'
    //collant: qu'on ne peut pas poser

    return objects.map(function (object) {
        return {
            id: object.idtable,
            nom: object.nomobjet,
            image: urls.getImageUrl(object.photoobjet),
            description: object.descriptionobjet,
            type: object.typeobjet.toLowerCase(),
            model: object.model,
            PAutiliser: int(object.PAutiliser),
            portee: int(object.portee),
            dommages: int(object.effet),
            rechargement: int(object.recharg),
            PV: int(object.PV),
            PVmax: int(object.PVmax),
            PAreparer: int(object.PAreparer),
            dispo: int(object.dispo),
            forceBonus: int(object.PFobj),
            precisionBonus: int(object.PPobj),
            vieBonus: int(object.PVobj),
            intelligenceBonus: int(object.PIobj),
            collant: object.collant === 'O',
            reparable: object.reparable === 'O',
            poussiere: int(object.poussiere)
        };
    });
}

function analyze(doc) {
    var js = analyzer.getJS(doc),
        inventaire = getInventaire(js),
        pager = analyzer.getPager(js);

    return {
        inventaire: inventaire,
        pager: pager
    };
}

function createObjetInfo(h, infos, index) {
    var objet = infos.inventaire[index],
        perso = infos.perso,
        isArme = objet.type === 'arme',
        degats = (isArme && perso) ? calcul.degats(perso, objet) : undefined,
        infoLines = [];

    infoLines.push('Type : ' + objet.type);
    if (degats) {
        infoLines.push('Dégâts : entre ' + degats.minimum + ' et ' + degats.maximum);
    }

    return h('div.nany.nany-info', [
        h('button.nany-info-trigger', '?'),
        h('div.nany-info-content',
            h('ul', infoLines.map(function (line) {
                return h('li', line);
            }))
        )
    ]);
}

function enhance(doc, infos) {
    var renderer = Renderer(doc),
        titles = analyzer.findAll(doc, 'td.news-titre');

    // load the CSS
    script.loadCSS(doc);

    // add an advisor box on each title
    titles.forEach(function (title, index) {
        var info = createObjetInfo(renderer, infos, index);

        if (info) {
            title.appendChild(info);
        }
    });
}

module.exports = Page('invent', {
    analyze: analyze,
    enhance: enhance
});
