/* detect page */
define(['./page', './urls', 'utils/array', 'utils/regexp'], function (Page, urls, array, regexp) {
    function int(value) {
        return parseInt(value, 10);
    }

    function findLocalisation(doc) {
        // example:
        // <span class="c1">Position (13,5) sur "Ronain Graou" |b95eb2f716c500db6|</span>
        var el = doc.getElementsByClassName('c1')[0],
            text = el.textContent,
            regex = /Position\s\((\d+),(\d+)\)\ssur\s"([^"]*)"/i,
            match = regex.exec(text);

        if (match) {
            return {
                position: [int(match[1]), int(match[2])],
                monde: match[3]
            };
        }
    }

    function getAllScriptsSource(doc) {
        var sources = Array.prototype.map.call(doc.scripts, function (script) {
            return script.src
                ? ''
                : script.innerHTML;
        });
        return sources.join('\n');
    }

    function processScriptArrays(doc, regex, keys, createObject) {
        var text = getAllScriptsSource(doc),
            matches = regexp.getAllMatches(regex, text);

        return matches.map(function (match) {
            var values = array.parse(match[1]),
                spec = array.toObject(keys, values);
            return createObject(spec);
        });
    }

    function parseTag(tag) {
        var regex = /<span\s+style=\"color:(#[0-9A-F]{6});\">([^<]*)<\/span>/i,
            match = regex.exec(tag);

        if (match) {
            return {
                nom: match[2],
                couleur: match[1]
            };
        }
    }

    function findNains(doc) {
        var regex = /tabavat\[\d+\]\s=\s(\[.*\]);/ig,
            keys = 'id,photo,nom,tag,barbe,classe,cote,distance,x,y,description,attaquer,gifler,estCible';

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
            // TODO: extract more info: tag perso
            // [Perso][Guilde] or [Guilde][Perso] or [PersoGuilde] or [GuildePerso]
            var nain = {
                    id: int(spec.id),
                    nom: spec.nom,
                    image: urls.imageUrl(spec.photo),
                    description: spec.description,
                    position: [int(spec.x), int(spec.y)],
                    cote: getCote(int(spec.classe)),
                    rang: spec.cote,
                    barbe: int(spec.barbe) / 100
                },
                tag = parseTag(spec.tag);

            if (tag) {
                nain.guilde = tag;
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
                image: urls.imageUrl(spec.photo),
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

    return Page('detect', analyze, {});
});
