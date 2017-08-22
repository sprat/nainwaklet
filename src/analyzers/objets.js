var array = require('core-js/library/fn/array');
var qs = require('qs');
var code = require('./code');
var int = require('./int');

var listNames = {
    bonnet: 'bonnet',  // objet sous le bonnet
    poser: 'inventaire',  // objet dans l'inventaire, on peut le poser
    ramasser: 'sol',  // objet au sol, on peut le ramasser
    encyclo: 'encyclo',  // objet dans l'encyclo
    fee: 'fee'  // quand on fait une recette ?
};

var idParams = {  // nom du paramètre donnant l'id de l'objet dans certaines actions
    bonnet: 'idbonnet',
    poser: 'idinv',
    ramasser: 'idsol'
};

// valeurs pour type: 'arme', 'rune', 'detecteur', 'vehicule', 'manger', 'special', 'inutile'

function analyzeActionLink(actionLink, context) {
    // extract the query string of the action link
    var query = actionLink.node.search.substring(1);
    var params = qs.parse(query);

    // read the action parameter and determine the target list and objet id
    var action = params['action'];
    var listName = listNames[action];
    var list = context.objets[listName];
    var idParam = idParams[action];
    var id = int(params[idParam]);

    // try to find the objet in the target list
    return array.find(list, function (objet) {
        return objet.id === id;
    });
}

function analyzeDocument(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var regex = /mip\((.*)\);/ig;
    var keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);
    var lists = {};

    function getList(model) {
        var listName = listNames[model];
        var list = lists[listName];

        if (list === undefined) {
            list = lists[listName] = [];
        }

        return list;
    }

    objects.forEach(function (object) {
        var list = getList(object.model);

        // des objets "speciaux" de type "arme" ont "???" comme valeur: ils ne
        // font pas de dommages donc on initialize la valeur à 0
        var dommages = object.effet === '???' ? 0 : int(object.effet);

        // cas spécial pour "Tarte à la crème" qui ne suit pas la règle précédente
        if (object.nomobjet === 'Tarte à la crème') {
            dommages = 0;
        }

        list.push({
            id: object.idtable,
            nom: object.nomobjet,
            image: '/images/' + object.photoobjet,
            description: object.descriptionobjet,
            type: object.typeobjet.toLowerCase(),
            PAutiliser: int(object.PAutiliser),
            portee: int(object.portee),
            dommages: dommages,
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

    return lists;
}

module.exports = {
    analyzeDocument: analyzeDocument,
    analyzeActionLink: analyzeActionLink
};
