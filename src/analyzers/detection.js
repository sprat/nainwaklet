var dom = require('src/utilities/dom');
var code = require('./code');
var analyzeTag = require('./tag');
var int = require('./int');

function analyzeLocalisation(doc) {
    // example:
    // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
    var text = dom.find('.c1', doc).text();
    var regex = /Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i;
    var match = regex.exec(text);

    if (match) {
        return {
            position: [int(match[1]), int(match[2])],
            monde: match[3]
        };
    }
}

function analyzeNains(js) {
    var regex = /tabavat\[\d+\]\s=\s\[(.*)\];/ig;
    var keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);
    var autresActions = {
        'a': 'accrocherPoisson', // Accrocher un poisson !,
        'c': 'offrirCadeau',  // Offrir un cadeau !,
        'o': 'gifler'  // Gifler
    };

    return objects.map(function (object) {
        var nain = {
            id: int(object.id),
            nom: object.nom,
            image: '/images/' + object.photo,
            description: object.description,
            position: [int(object.x), int(object.y)],
            classe: int(object.classe),
            rang: object.cote,
            barbe: int(object.barbe) / 100,
            attaquable: object.attaquer === 'o',
            autreAction: autresActions[object.gifler],
            estCible: object.estCible == 1
        };

        var tag = analyzeTag(object.tag);
        if (tag) {
            nain.tag = tag;
        }

        return nain;
    });
}

function analyzeObjets(js) {
    var regex = /tabobjet\[\d+\]\s=\s\[(.*)\];/ig;
    var keys = 'id,photo,nom,distance,x,y,categorie,poussiere'.split(',');
    var objects = code.buildObjectsFromJSSequences(js, regex, keys);

    return objects.map(function (object) {
        return {
            id: int(object.id),
            nom: object.nom,
            image: '/images/' + object.photo,
            type: object.categorie.toLowerCase(),
            position: [int(object.x), int(object.y)],
            poussiere: int(object.poussiere)  // expressed in seconds
        };
    });
}

function analyze(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var localisation = analyzeLocalisation(doc);
    var nains = analyzeNains(js);
    var objets = analyzeObjets(js);

    return {
        monde: localisation.monde,
        position: localisation.position,
        nains: nains,
        objets: objets
    };
}

module.exports = analyze;
