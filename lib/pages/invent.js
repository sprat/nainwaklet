var Page = require('./page'),
    analyzer = require('./analyzer'),
    Renderer = require('../renderer'),
    urls = require('../urls'),
    script = require('../script');
    //calcul = require('../calcul');

function int(value) {
    return parseInt(value, 10);
}

function getObjets(js) {
    var regex = /mip\((.*)\);/ig,
        keys = 'idtable,nomobjectet,photoobjectet,descriptionobjectet,model,typeobjectet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobject,PPobject,PVobject,PIobject,collant,reparable,poussiere'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);

    //model: 'bonnet', 'poser', 'encyclo', 'ramasser', 'fee'
    //collant: qu'on ne peut pas poser

    return objects.map(function (object) {
        return {
            id: object.idtable,
            nom: object.nomobjectet,
            image: urls.getImageUrl(object.photoobjectet),
            description: object.descriptionobjectet,
            type: object.typeobjectet.toLowerCase(),
            model: object.model,
            PAutiliser: int(object.PAutiliser),
            portee: int(object.portee),
            dommages: int(object.effet),
            rechargement: int(object.recharg),
            PV: int(object.PV),
            PVmax: int(object.PVmax),
            PAreparer: int(object.PAreparer),
            dispo: int(object.dispo),
            forceBonus: int(object.PFobject),
            precisionBonus: int(object.PPobject),
            vieBonus: int(object.PVobject),
            intelligenceBonus: int(object.PIobject),
            collant: object.collant === 'O',
            reparable: object.reparable === 'O',
            poussiere: int(object.poussiere)
        };
    });
}

function analyze(doc) {
    var js = analyzer.getJS(doc),
        objets = getObjets(js),
        pager = analyzer.getPager(js);

    var analysis = Object.freeze({
        objets: objets,
        pager: pager
    });

    enhance(doc, analysis);

    return analysis;
}

function createInfo(h, objet) {
    //calcul.degats()
    return h('div.nany.nany-info', [
        h('button.nany-info-trigger', '?'),
        h('div.nany-info-content', 'Type : ' + objet.type)
    ]);
}

function enhance(doc, analysis) {
    var renderer = Renderer(doc),
        titles = analyzer.findAll(doc, 'td.news-titre');

    // load the CSS
    script.loadCSS(doc);

    // add an advisor box on each title
    titles.forEach(function (title, index) {
        var objet = analysis.objets[index],
            info = createInfo(renderer, objet);

        if (info) {
            title.appendChild(info);
        }
    });
}

module.exports = Page('invent', analyze);
