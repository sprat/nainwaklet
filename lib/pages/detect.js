/* detect page */
var Page = require('./page'),
    analyzer = require('./analyzer'),
    urls = require('../urls'),
    zipObject = require('zip-object');

function int(value) {
    return parseInt(value, 10);
}

function findLocalisation(doc) {
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

function processScriptArrays(doc, regex, keys, createObject) {
    var jsCode = analyzer.getScriptsCode(doc),
        objs = [];

    // process all matches
    jsCode.replace(regex, function (all, valuesStr) {
        var values = analyzer.evaluateJS(valuesStr),
            spec = zipObject(keys, values),
            obj = createObject(spec);
        objs.push(obj);
    });

    return objs;
}

function findNains(doc) {
    var regex = /tabavat\[\d+\]\s=\s(\[.*\]);/ig,
        keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible';

    // TODO: extract to the analyzer?
    function getCote(classe) {
        switch (classe) {
        case 0:
            return 'nain-déci';
        case 1:
            return 'brave';
        case 2:
            return 'sadique';
        case 3:
            return 'rampant';
        case 7:
            return 'mutant';
        default:
            return 'unknown';
        }
    }

    return processScriptArrays(doc, regex, keys.split(','), function (spec) {
        var nain = {
                id: int(spec.id),
                nom: spec.nom,
                image: urls.getImageUrl(spec.photo),
                description: spec.description,
                position: [int(spec.x), int(spec.y)],
                cote: getCote(int(spec.classe)),
                rang: spec.cote,
                barbe: int(spec.barbe) / 100
            },
            tag = analyzer.parseTag(spec.tag);

        if (tag) {
            nain.tag = tag;
        }

        return nain;
    });
}

function findObjets(doc) {
    var regex = /tabobjet\[\d+\]\s=\s(\[.*\]);/ig,
        keys = 'id,photo,nom,distance,x,y,categorie,poussiere';

    return processScriptArrays(doc, regex, keys.split(','), function (spec) {
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
    var localisation = findLocalisation(doc),
        nains = findNains(doc),
        objets = findObjets(doc);

    return {
        monde: localisation.monde,
        position: localisation.position,
        nains: nains,
        objets: objets
    };
}

module.exports = Page('detect', analyze);
