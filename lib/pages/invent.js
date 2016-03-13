var Page = require('./page'),
    analyzer = require('./analyzer'),
    urls = require('../urls');

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
    var js = analyzer.getScriptsCode(doc),
        objets = getObjets(js),
        pager = analyzer.getPager(js);

    return Object.freeze({
        objets: objets,
        pager: pager
    });
}

module.exports = Page('invent', analyze);
