var Page = require('./page'),
    analyzer = require('./analyzer'),
    urls = require('../urls');

function int(value) {
    return parseInt(value, 10);
}

function getObjets(js) {
    var regex = /mip\((.*)\);/ig,
        keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);

    //model: 'bonnet', 'poser', 'encyclo', 'ramasser', 'fee'
    //collant: qu'on ne peut pas poser

    return objects.map(function (obj) {
        return {
            id: obj.idtable,
            nom: obj.nomobjet,
            image: urls.getImageUrl(obj.photoobjet),
            description: obj.descriptionobjet,
            type: obj.typeobjet.toLowerCase(),
            model: obj.model,
            PAutiliser: int(obj.PAutiliser),
            portee: int(obj.portee),
            dommages: int(obj.effet),
            rechargement: int(obj.recharg),
            PV: int(obj.PV),
            PVmax: int(obj.PVmax),
            PAreparer: int(obj.PAreparer),
            dispo: int(obj.dispo),
            forceBonus: int(obj.PFobj),
            precisionBonus: int(obj.PPobj),
            vieBonus: int(obj.PVobj),
            intelligenceBonus: int(obj.PIobj),
            collant: obj.collant === 'O',
            reparable: obj.reparable === 'O',
            poussiere: int(obj.poussiere)
        };
    });
}

function analyze(doc) {
    var js = analyzer.getScriptsCode(doc),
        objets = getObjets(js);

    //miseajourpager(pa, pv, pvbase, classeeven, evnonlu, classechat, mesgnonlu, posx, posy, IDS, newmonochat)

    return {
        objets: objets
    };
}

module.exports = Page('invent', analyze);
