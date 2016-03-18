/* detect page */
var Page = require('./page'),
    analyzer = require('./analyzer'),
    int = analyzer.int,
    urls = require('../urls');

function getLocalisation(doc) {
    // example:
    // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
    var text = analyzer.getText(doc, '.c1'),
        regex = /Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i,
        match = regex.exec(text);

    if (match) {
        return {
            position: [int(match[1]), int(match[2])],
            monde: match[3]
        };
    }
}

function getNains(js) {
    var regex = /tabavat\[\d+\]\s=\s\[(.*)\];/ig,
        keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys),
        autresActions = {
            'a': 'accrocherPoisson', // Accrocher un poisson !,
            'c': 'offrirCadeau',  // Offrir un cadeau !,
            'o': 'gifler'  // Gifler
        };

    return objects.map(function (spec) {
        var nain = {
                id: int(spec.id),
                nom: spec.nom,
                image: urls.getImageUrl(spec.photo),
                description: spec.description,
                position: [int(spec.x), int(spec.y)],
                classe: analyzer.getClasse(int(spec.classe)),
                rang: spec.cote,
                barbe: int(spec.barbe) / 100,
                attaquable: spec.attaquer === 'o',
                autreAction: autresActions[spec.gifler],
                estCible: spec.estCible == 1
            },
            tag = analyzer.parseTag(spec.tag);

        if (tag) {
            nain.tag = tag;
        }

        return nain;
    });
}

function getObjets(js) {
    var regex = /tabobjet\[\d+\]\s=\s\[(.*)\];/ig,
        keys = 'id,photo,nom,distance,x,y,categorie,poussiere'.split(','),
        objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (spec) {
        return {
            id: int(spec.id),
            nom: spec.nom,
            image: urls.getImageUrl(spec.photo),
            categorie: spec.categorie.toLowerCase(),
            position: [int(spec.x), int(spec.y)],
            poussiere: int(spec.poussiere)  // expressed in seconds
        };
    });
}

function analyze(doc) {
    var js = analyzer.getJS(doc),
        localisation = getLocalisation(doc),
        nains = getNains(js),
        objets = getObjets(js);

    return {
        detection: {
            monde: localisation.monde,
            position: localisation.position,
            nains: nains,
            objets: objets
        },
        pager: analyzer.getPager(js)
    };
}

module.exports = Page('detect', analyze);
