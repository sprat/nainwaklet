var decodeEntities = require('htmldec');

/*
// convert quotes to double quotes
function escapeQuotes(string) {
    return string.replace(/([\[,]\s*)'(.*)'(\s*[,\]])/g, function (ignore, before, inside, after) {
        var escaped = inside.replace(/"/g, '\\"');  // escape double-quotes inside
        return before + '"' + escaped + '"' + after;  // wrap in double-quotes
    });
}
*/

function getScriptsCode(doc) {
    var sources = Array.prototype.map.call(doc.scripts, function (script) {
        return script.src ? '' : script.innerHTML;
    });
    return sources.join('\n');
}

function decodeEnt(value) {
    if (typeof value === 'string') {
        value = decodeEntities(value);
    }
    return value;
}

// parses a string representation of a Javascript value
function evaluateJS(string) {
    // should be safe because we only pass code coming from the Nainwak
    // game pages, not user input
    // TODO: but maybe we can make it safer?
    var value = eval(string);

    if (Array.isArray(value)) {
        return value.map(decodeEnt);
    } else {
        return decodeEnt(value);
    }
}

function buildObjectFromJS(js, regex) {
    var result = {};

    js.replace(regex, function (match, name) {
        var values = Array.prototype.slice.call(arguments, 2, arguments.length - 2);
        values = values.map(evaluateJS);
        result[name] = (values.length > 1) ? values : values[0];
    });

    return result;
}

function getText(context, selector) {
    var el = context.querySelector(selector);
    if (el) {
        return el.textContent;
    }
}

function getHtml(context, selector) {
    var el = context.querySelector(selector);
    if (el) {
        return el.innerHTML;
    }
}

function getAttr(context, selector, attr) {
    var el = context.querySelector(selector);
    if (el) {
        return el.getAttribute(attr);
    }
}

function parseTag(tag) {
    var noBracketsTag = tag.replace(/\] \[|\[|\]/g, ''),
        guildeRegex = /<span\s+style=\"color:(#[0-9A-F]{6});\">([^<]*)<\/span>/i,
        guilde = '',
        result = {};

    // find the guilde and perso elements
    var perso = noBracketsTag.replace(guildeRegex, function(match, couleur, nom) {
        guilde = match;
        result.guilde = {
            nom: nom,
            couleur: couleur
        };
        return '';
    });

    if (perso) {
        result.perso = perso;
    }

    /*
     * type values:
     * 1: [PersoGuilde]
     * 2: [GuildePerso]
     * 3: [Perso][Guilde]
     * 4: [Guilde][Perso]
     */
    if (perso && guilde) {
        switch (tag) {
        case '[' + perso + guilde + ']':
            result.type = 1;
            break;
        case '[' + guilde + perso + ']':
            result.type = 2;
            break;
        case '[' + perso + '][' + guilde + ']':
        case '[' + perso + '] [' + guilde + ']':
            result.type = 3;
            break;
        case '[' + guilde + '][' + perso + ']':
        case '[' + guilde + '] [' + perso + ']':
            result.type = 4;
            break;
        }
    }

    return result;
}

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

module.exports = {
    getScriptsCode: getScriptsCode,
    evaluateJS: evaluateJS,
    buildObjectFromJS: buildObjectFromJS,
    getText: getText,
    getHtml: getHtml,
    getAttr: getAttr,
    parseTag: parseTag,
    getCote: getCote
};
