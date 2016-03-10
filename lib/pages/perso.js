var Page = require('./page'),
    Analyzer = require('./analyzer'),
    extend = require('xtend/mutable');

function int(s) {
    return parseInt(s, 10);
}

function getComputedCharacteristics(analyzer) {
    var jsCode = analyzer.getScriptsCode(),
        regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[\+\/](-?\d+)\)/g,
        lines = {},
        data = {};

    // find all lines looking like: "$('sPVBase').innerHTML = (109+39);"
    jsCode.replace(regex, function(match, name, value1, value2) {
        lines[name] = [int(value1), int(value2)];
    });

    data = {
        barbe: lines.sBarbe[0] / lines.sBarbe[1],
        vie: lines.sPV[0] + lines.sPV[1],
        vieBase: lines.sPVBase[0],
        vieBonus: lines.sPVBase[1],
        forceBase: lines.sForce[0],
        forceBonus: lines.sForce[1],
        precisionBase: lines.sPrecis[0],
        precisionBonus: lines.sPrecis[1],
        intelligenceBase: lines.sIntell[0],
        intelligenceBonus: lines.sIntell[1],
        honneurBase: lines.sPG[0],
        honneurBonus: lines.sPG[1]
        /* TODO: sBarbeCible & sBarbeChasseur */
    };

    // compute the totals
    data.vieTotal = data.vieBase + data.vieBonus;
    data.force = data.forceBase + data.forceBonus;
    data.precision = data.precisionBase + data.precisionBonus;
    data.intelligence = data.intelligenceBase + data.intelligenceBonus;
    data.honneur = data.honneurBase + data.honneurBonus;

    return data;
}

function getJSVariables(analyzer) {
    var jsCode = analyzer.getScriptsCode(),
        regex = /var (\w+)\s+=\s+([['\d].*);\s+/g,
        variables = {};

    // find all lines looking like: "var mavar = 'whatever';"
    jsCode.replace(regex, function(match, name, value) {
        variables[name] = analyzer.evaluateJS(value);
    });

    return variables;
}

function analyze(doc) {
    var analyzer = Analyzer(doc),
        jsVars = getJSVariables(analyzer),
        data;

    /*
     * tag.format values:
     * 1: [PersoGuilde]
     * 2: [GuildePerso]
     * 3: [Perso][Guilde]
     * 4: [Guilde][Perso]
     */

    data = {
        rang: analyzer.getText('#sRang'),
        description: jsVars['description'],
        tag: {
            guilde: jsVars['tagGuilde'],
            couleur: jsVars['couleurTagGuilde'],
            perso: analyzer.getAttribute('#f_tag', 'value'),
            format: int(analyzer.getAttribute('#f_typeTag option[selected]', 'value'))
        }
    };

    extend(data, getComputedCharacteristics(analyzer));

    return Object.freeze(data);
}

module.exports = Page('perso', analyze);