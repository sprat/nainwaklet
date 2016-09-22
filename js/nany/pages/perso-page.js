var Page = require('./page');
var Analyzer = require('./analyzer');
var Classe = require('./classe');
var Tag = require('./tag');
var int = Analyzer.int;

function getClasses(js) {
    var regex = /\$\('(\w+)'\).addClassName\(cotes\[(\d)+\]\);/g;
    return Analyzer.buildObjectFromJS(js, regex);
}

function getCharacteristics(js) {
    // find all lines looking like: $('sPVBase').innerHTML = (109+39);
    var regex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[\+\/](-?\d+)\)/g;
    return Analyzer.buildObjectFromJS(js, regex);
}

function getBlocsDroits(doc) {
    var rows = Analyzer.findAll(doc, '.bloc-perso tr');
    var data = {};

    rows.forEach(function (row) {
        var name = Analyzer.getText(row, '.bloc_droit');
        var value = Analyzer.getText(row, 'td b');

        if (name && value) {
            data[name] = int(value);
        }
    });

    return data;
}

function analyze(doc, date, context) {
    var js = Analyzer.getJS(doc);
    var classes = getClasses(js);
    var characts = getCharacteristics(js);
    var blocsDroits = getBlocsDroits(doc);
    var cible = Analyzer.find(doc, '.bloc-perso .cible');

    context.perso = {
        nom: Analyzer.getAttr(doc, 'input[name="nvNain"]', 'value'),
        image: Analyzer.getAttr(doc, '.news-titre img', 'src'),
        rang: Analyzer.getText(doc, '#sRang'),
        classe: Classe.fromInt(classes['sRang']),
        barbe: characts.sBarbe[0] / characts.sBarbe[1],
        description: Analyzer.getAttr(doc, 'input[name="description"]', 'value'),
        arme: Analyzer.getAttr(doc, 'input[name="nomArme"]', 'value'),
        tag: Tag.parse(Analyzer.getHtml(doc, '#s_Tag')),
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
        cible: {
            nom: cible.firstChild.textContent,
            classe: Classe.fromInt(classes['sRangCible']),
            rang: Analyzer.getText(cible, '#sRangCible'),
            barbe: characts.sBarbeCible[0] / characts.sBarbeCible[1]
        },
        chasseurs: {
            nombre: blocsDroits['Nombre de chasseurs'],
            barbe: characts.sBarbeChass[0] / characts.sBarbeChass[1]
        }
    };

    return {
        perso: context.perso
    };
}

module.exports = Page('perso', {
    analyze: analyze
});
