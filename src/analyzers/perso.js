var dom = require('src/utilities/dom');
var code = require('./code');
var analyzeTag = require('./tag');
var int = require('./int');

function getClasses(js) {
    var regex = /\$\('(\w+)'\).addClassName\(cotes\[(\d)+\]\);/g;
    return code.buildObjectFromJS(js, regex);
}

function getCharacteristics(js) {
    // find all lines looking like: $('sPVBase').innerHTML = (109+39);
    var regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[+/](-?\d+)\)/g;
    return code.buildObjectFromJS(js, regex);
}

function getBlocsDroits(doc) {
    var rows = dom.findAll('.bloc-perso tr', doc);
    var data = {};

    rows.forEach(function (row) {
        var nameElement = row.find('.bloc_droit');
        var valueElement = row.find('td b');

        if (nameElement && valueElement) {  // not all rows have both elements
            // keep only the first integer in the value
            var value = int(valueElement.text().replace(/(\d+).*/, '$1'));
            data[nameElement.text()] = value;
        }
    });

    return data;
}

function analyze(doc/*, date*/) {
    var js = code.getInlineJS(doc);
    var classes = getClasses(js);
    var characts = getCharacteristics(js);
    var blocsDroits = getBlocsDroits(doc);
    var cibleElement = dom.find('.bloc-perso .cible', doc);

    var perso = {
        nom: dom.find('input[name="nvNain"]', doc).attr('value'),
        image: dom.find('.news-titre img', doc).attr('src'),
        rang: dom.find('#sRang', doc).text(),
        classe: classes['sRang'],
        barbe: characts.sBarbe[0] / characts.sBarbe[1],
        description: dom.find('input[name="description"]', doc).attr('value'),
        arme: dom.find('input[name="nomArme"]', doc).attr('value'),
        tag: analyzeTag(dom.find('#s_Tag', doc).html()),
        vie: characts.sPV[0] + characts.sPV[1],
        vieBase: characts.sPVBase[0],
        vieBonus: characts.sPVBase[1],
        get vieTotal() {
            return this.vieBase + this.vieBonus;
        },
        forceBase: characts.sForce[0],
        forceBonus: characts.sForce[1],
        get force() {
            return this.forceBase + this.forceBonus;
        },
        precisionBase: characts.sPrecis[0],
        precisionBonus: characts.sPrecis[1],
        get precision() {
            return this.precisionBase + this.precisionBonus;
        },
        intelligenceBase: characts.sIntell[0],
        intelligenceBonus: characts.sIntell[1],
        get intelligence() {
            return this.intelligenceBase + this.intelligenceBonus;
        },
        honneurBase: characts.sPG[0],
        honneurBonus: characts.sPG[1],
        get honneur() {
            return this.honneurBase + this.honneurBonus;
        },
        cote: blocsDroits['Points de Côté'],
        ridicule: blocsDroits['Points de Ridicule'],
        honte: blocsDroits['Points de Honte'],
        xp: blocsDroits["Points d'XP"],
        tues: blocsDroits["Nombre d'ennemis tués"],
        morts: blocsDroits['Nombre de morts'],
        giflesDonnees: blocsDroits['Nombre de gifles données'],
        giflesRecues: blocsDroits['Nombre de gifles reçues'],
        chasseurs: {
            nombre: blocsDroits['Nombre de chasseurs'],
            barbe: characts.sBarbeChass[0] / characts.sBarbeChass[1]
        }
    };

    if (cibleElement) {
        perso.cible = {
            nom: cibleElement.firstChild().text(),
            classe: classes['sRangCible'],
            rang: cibleElement.find('#sRangCible').text(),
            barbe: characts.sBarbeCible[0] / characts.sBarbeCible[1]
        };
    }

    return perso;
}

module.exports = analyze;
