var Page = require('./page'),
    analyzer = require('./analyzer'),
    extend = require('xtend/mutable');

function getCotes(js) {
    var regex = /\$\('(\w+)'\).addClassName\(cotes\[(\d)+\]\);/g;
    return analyzer.buildObjectFromJS(js, regex);
}

/*
function getJSVariables(js) {
    // find all lines looking like: var mavar = 'whatever';
    var regex = /var (\w+)\s+=\s+([\['\d].*);\s+/g;
    return analyzer.buildObjectFromJS(js, regex);
}
*/

function getComputedCharacteristics(js) {
    // find all lines looking like: $('sPVBase').innerHTML = (109+39);
    var regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[\+\/](-?\d+)\)/g,
        lines = analyzer.buildObjectFromJS(js, regex),
        data = {};

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

function analyze(doc) {
    var js = analyzer.getScriptsCode(doc),
        cotes = getCotes(js),
        characts = getComputedCharacteristics(js),
        data;

    data = {
        nom: analyzer.getAttr(doc, 'input[name="nvNain"]', 'value'),
        image: analyzer.getAttr(doc, '.news-titre img', 'src'),
        rang: analyzer.getText(doc, '#sRang'),
        cote: analyzer.getCote(cotes['sRang']),
        description: analyzer.getAttr(doc, 'input[name="description"]', 'value'),
        arme: analyzer.getAttr(doc, 'input[name="nomArme"]', 'value'),
        tag: analyzer.parseTag(analyzer.getHtml(doc, '#s_Tag'))
    };

    extend(data, characts);

    return Object.freeze(data);
}

module.exports = Page('perso', analyze);