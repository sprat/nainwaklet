/* detect page */
define(['./page', './urls', 'utils/array'], function (Page, urls, array) {
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
            objs = [];

        // process all matches
        text.replace(regex, function (all, valuesStr) {
            var values = array.parse(valuesStr),
                spec = array.toObject(keys, values),
                obj = createObject(spec);
            objs.push(obj);
        });

        return objs;
    }

    function parseTag(tag) {
        var doubleTagRegex = /\[(.*?)\]\s*\[(.*?)\]/,
            singleTagRegex = /\[(.*?)\]/,
            guildeRegex = /<span\s+style=\"color:(#[0-9A-F]{6});\">([^<]*)<\/span>/i,
            result = {},
            match,
            elements;

        // find the tag elements
        match = doubleTagRegex.exec(tag);
        elements = match ? [match[1], match[2]] : [tag.replace(singleTagRegex, '$1')];

        // determine which element is guilde
        match = guildeRegex.exec(elements[0]);
        if (!match) {
            // swap the elements
            elements = [elements[1], elements[0]];
            match = guildeRegex.exec(elements[0]);
        }

        if (match) {
            result.guilde = {
                nom: match[2],
                couleur: match[1]
            };
        }

        if (elements[1]) {
            result.perso = elements[1];
        }

        // TODO: extract tag format?
        // 1. [Perso][Guilde]
        // 2. [Guilde][Perso]
        // 3. [PersoGuilde]
        // 4. [GuildePerso]

        return result;
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
