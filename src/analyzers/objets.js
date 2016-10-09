var dom = require('../dom');
var code = require('./code');
var calcul = require('../calcul');
var int = require('./int');

var listNames = {
    bonnet: 'bonnet',  // objet sous le bonnet
    poser: 'inventaire',  // objet dans l'inventaire, on peut le poser
    ramasser: 'sol',  // objet au sol, on peut le ramasser
    encyclo: 'encyclo',  // objet dans l'encyclo
    fee: 'fee'  // quand on fait une recette ?
};

function analyze(doc, date, context) {
    var js = dom.getInlineJavascript(doc);
    var regex = /mip\((.*)\);/ig;
    var keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);
    var lists = {};

    function getList(object) {
        var listName = listNames[object.model];
        var list = lists[listName];

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
            image: '/images/' + object.photoobjet,
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
            intelligenceBonus: int(object.PIobj),
            vieBonus: int(object.PVobj),
            collant: object.collant === 'O',
            reparable: object.reparable === 'O',
            poussiere: int(object.poussiere)
        });
    });

    context.objets = context.objets || {};
    Object.assign(context.objets, lists);

    // update the 'perso' bonus data according to the objects in 'inventaire'
    if (context.perso) {
        var bonuses = calcul.bonusObjets(context.objets.inventaire);
        Object.assign(context.perso, bonuses);
    }

    return lists;
}

module.exports = analyze;
