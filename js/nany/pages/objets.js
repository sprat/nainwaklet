var analyzer = require('./analyzer'),
    int = analyzer.int,
    urls = require('../urls'),
    extend = require('xtend/mutable');

/* model:
 * - 'bonnet' : objet sous le bonnet
 * - 'poser' : objet dans l'inventaire, on peut le poser
 * - 'ramasser' : objet au sol, on peut le ramasser
 * - 'encyclo' : objet dans l'encyclo
 * - 'fee' : quand on fait une recette ?
 */
var listNames = {
    'bonnet': 'bonnet',
    'poser': 'inventaire',
    'ramasser': 'sol',
    'encyclo': 'encyclo',
    'fee': 'fee'
};

function analyze(js, infos) {
    var regex = /mip\((.*)\);/ig,
        keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys),
        lists = {};

    function getList(object) {
        var listName = listNames[object.model],
            list = lists[listName];

        if (list === undefined) {
            list = lists[listName] = [];
        }

        return list;
    }

    objects.forEach(function (object) {
        var list = getList(object);
        list.push({
            id: object.idtable,
            nom: object.nomobjet,
            image: urls.getImageUrl(object.photoobjet),
            description: object.descriptionobjet,
            type: object.typeobjet.toLowerCase(),
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
        });
    });

    infos.objets = infos.objets || {};
    extend(infos.objets, lists);

    return lists;
}

module.exports = {
    analyze: analyze
};
