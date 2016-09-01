var analyzer = require('./analyzer'),
    urls = require('../urls');

function analyze(js) {
    var regex = /mip\((.*)\);/ig,
        keys = 'idtable,nomobjet,photoobjet,descriptionobjet,model,typeobjet,PAutiliser,portee,effet,recharg,PV,PVmax,PAreparer,dispo,PFobj,PPobj,PVobj,PIobj,collant,reparable,poussiere'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys),
        int = analyzer.int;

    /* model:
     * - 'bonnet' : objet sous le bonnet
     * - 'poser' : objet dans l'inventaire, on peut le poser
     * - 'encyclo' : objet dans l'encyclo
     * - 'ramasser' : objet au sol, on peut le ramasser
     * - 'fee' : quand on fait une recette ?
     */

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

module.exports = {
    analyze: analyze
};
