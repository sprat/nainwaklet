var Page = require('./page'),
    analyzer = require('./analyzer'),
    extend = require('xtend/mutable');

function int(value) {
    return parseInt(value, 10);
}

function getClasses(js) {
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

function getBlocDroitValues(doc) {
    var rows = analyzer.selectAll(doc, '.bloc-perso tr'),
        data = {};

    rows.forEach(function (row) {
        var name = analyzer.getText(row, 'td.bloc_droit'),
            value = analyzer.getText(row, 'td[align] b');

        if (name && value) {
            data[name] = int(value);
        }
    });

    return data;
}

function analyze(doc) {
    var js = analyzer.getScriptsCode(doc),
        classes = getClasses(js),
        characts = getComputedCharacteristics(js),
        blocDroitValues = getBlocDroitValues(doc),
        data;

    data = {
        nom: analyzer.getAttr(doc, 'input[name="nvNain"]', 'value'),
        image: analyzer.getAttr(doc, '.news-titre img', 'src'),
        rang: analyzer.getText(doc, '#sRang'),
        classe: analyzer.getClasse(classes['sRang']),
        description: analyzer.getAttr(doc, 'input[name="description"]', 'value'),
        arme: analyzer.getAttr(doc, 'input[name="nomArme"]', 'value'),
        tag: analyzer.parseTag(analyzer.getHtml(doc, '#s_Tag')),
        cote: blocDroitValues['Points de Côté'],
        ridicule: blocDroitValues['Points de Ridicule'],
        honte: blocDroitValues['Points de Honte'],
        xp: blocDroitValues["Points d'XP"],
        tues: blocDroitValues["Nombre d'ennemis tués"],
        morts: blocDroitValues['Nombre de morts'],
        giflesDonnees: blocDroitValues['Nombre de gifles données'],
        giflesRecues: blocDroitValues['Nombre de gifles reçues']
    };
    // TODO: blocDroitValues['Nombre de chasseurs']

    extend(data, characts);

    return Object.freeze(data);
}

module.exports = Page('perso', analyze);