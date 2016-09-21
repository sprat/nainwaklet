/* detect page */
var Page = require('./page');
var analyzer = require('./analyzer');
var tag = require('./tag');
var classe = require('./classe');
var pager = require('./pager');
var int = analyzer.int;
var urls = require('../urls');

function getLocalisation(doc) {
    // example:
    // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
    var text = analyzer.getText(doc, '.c1');
    var regex = /Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i;
    var match = regex.exec(text);

    if (match) {
        return {
            position: [int(match[1]), int(match[2])],
            monde: match[3]
        };
    }
}

function getNains(js) {
    var regex = /tabavat\[\d+\]\s=\s\[(.*)\];/ig;
    var keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible'.split(',');
    var objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);
    var autresActions = {
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
            classe: classe.fromInt(int(spec.classe)),
            rang: spec.cote,
            barbe: int(spec.barbe) / 100,
            attaquable: spec.attaquer === 'o',
            autreAction: autresActions[spec.gifler],
            estCible: spec.estCible == 1
        };
        var tagObject = tag.parse(spec.tag);

        if (tagObject) {
            nain.tag = tagObject;
        }

        return nain;
    });
}

function getObjets(js) {
    var regex = /tabobjet\[\d+\]\s=\s\[(.*)\];/ig;
    var keys = 'id,photo,nom,distance,x,y,categorie,poussiere'.split(',');
    var objects = analyzer.buildObjectsFromJSSequences(js, regex, keys);

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

function analyze(doc, date, context) {
    var js = analyzer.getJS(doc);
    var localisation = getLocalisation(doc);
    var nains = getNains(js);
    var objets = getObjets(js);

    context.detection = {
        monde: localisation.monde,
        position: localisation.position,
        nains: nains,
        objets: objets
    };

    return {
        detection: context.detection,
        pager: pager.analyze(js, context)
    };
}

module.exports = Page('detect', {
    analyze: analyze
});
