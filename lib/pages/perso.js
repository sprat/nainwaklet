var Page = require('./page'),
    analyzer = require('./analyzer'),
    int = analyzer.int;

function getClasses(js) {
    var regex = /\$\('(\w+)'\).addClassName\(cotes\[(\d)+\]\);/g;
    return analyzer.buildObjectFromJS(js, regex);
}

function getCharacteristics(js) {
    // find all lines looking like: $('sPVBase').innerHTML = (109+39);
    var regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[\+\/](-?\d+)\)/g;
    return analyzer.buildObjectFromJS(js, regex);
}

function getBlocsDroits(doc) {
    var rows = analyzer.findAll(doc, '.bloc-perso tr'),
        data = {};

    rows.forEach(function (row) {
        var name = analyzer.getText(row, '.bloc_droit'),
            value = analyzer.getText(row, 'td b');

        if (name && value) {
            data[name] = int(value);
        }
    });

    return data;
}

function analyze(doc) {
    var js = analyzer.getJS(doc),
        classes = getClasses(js),
        characts = getCharacteristics(js),
        blocsDroits = getBlocsDroits(doc),
        cible = analyzer.find(doc, '.bloc-perso .cible'),
        data;

    data = {
        nom: analyzer.getAttr(doc, 'input[name="nvNain"]', 'value'),
        image: analyzer.getAttr(doc, '.news-titre img', 'src'),
        rang: analyzer.getText(doc, '#sRang'),
        classe: analyzer.getClasse(classes['sRang']),
        barbe: characts.sBarbe[0] / characts.sBarbe[1],
        description: analyzer.getAttr(doc, 'input[name="description"]', 'value'),
        arme: analyzer.getAttr(doc, 'input[name="nomArme"]', 'value'),
        tag: analyzer.parseTag(analyzer.getHtml(doc, '#s_Tag')),
        vie: characts.sPV[0] + characts.sPV[1],
        vieBase: characts.sPVBase[0],
        vieBonus: characts.sPVBase[1],
        forceBase: characts.sForce[0],
        forceBonus: characts.sForce[1],
        precisionBase: characts.sPrecis[0],
        precisionBonus: characts.sPrecis[1],
        intelligenceBase: characts.sIntell[0],
        intelligenceBonus: characts.sIntell[1],
        honneurBase: characts.sPG[0],
        honneurBonus: characts.sPG[1],
        cote: blocsDroits['Points de Côté'],
        ridicule: blocsDroits['Points de Ridicule'],
        honte: blocsDroits['Points de Honte'],
        xp: blocsDroits["Points d'XP"],
        tues: blocsDroits["Nombre d'ennemis tués"],
        morts: blocsDroits['Nombre de morts'],
        giflesDonnees: blocsDroits['Nombre de gifles données'],
        giflesRecues: blocsDroits['Nombre de gifles reçues'],
        cible: {
            nom: cible.firstChild.textContent,
            classe: analyzer.getClasse(classes['sRangCible']),
            rang: analyzer.getText(cible, '#sRangCible'),
            barbe: characts.sBarbeCible[0] / characts.sBarbeCible[1]
        },
        chasseurs: {
            nombre: blocsDroits['Nombre de chasseurs'],
            barbe: characts.sBarbeChass[0] / characts.sBarbeChass[1]
        }
    };

    // compute the totals
    data.vieTotal = data.vieBase + data.vieBonus;
    data.force = data.forceBase + data.forceBonus;
    data.precision = data.precisionBase + data.precisionBonus;
    data.intelligence = data.intelligenceBase + data.intelligenceBonus;
    data.honneur = data.honneurBase + data.honneurBonus;

    return Object.freeze(data);
}

module.exports = Page('perso', analyze);