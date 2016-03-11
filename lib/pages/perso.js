var Page = require('./page'),
    analyzer = require('./analyzer'),
    extend = require('xtend/mutable');

function int(s) {
    return parseInt(s, 10);
}

function getCotes(jsCode) {
    var regex = /\$\('(\w+)'\).addClassName\(cotes\[(\d)+\]\);/g,
        data = {};

    jsCode.replace(regex, function(match, name, value) {
        data[name] = analyzer.getCote(int(value));
    });

    return data;
}

function getComputedCharacteristics(jsCode) {
    var regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[\+\/](-?\d+)\)/g,
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

function getJSVariables(jsCode) {
    var regex = /var (\w+)\s+=\s+([['\d].*);\s+/g,
        variables = {};

    // find all lines looking like: "var mavar = 'whatever';"
    jsCode.replace(regex, function(match, name, value) {
        variables[name] = analyzer.evaluateJS(value);
    });

    return variables;
}

function analyze(doc) {
    var jsCode = analyzer.getScriptsCode(doc),
        jsVars = getJSVariables(jsCode),
        cotes = getCotes(jsCode),
        data;

    data = {
        rang: analyzer.getText(doc, '#sRang'),
        cote: cotes['sRang'],
        description: jsVars['description'],
        tag: analyzer.parseTag(analyzer.getHtml(doc, '#s_Tag'))
    };

    extend(data, getComputedCharacteristics(jsCode));

    return Object.freeze(data);
}

module.exports = Page('perso', analyze);