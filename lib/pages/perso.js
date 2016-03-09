var Page = require('./page'),
    analyzer = require('./analyzer');

function int(s) {
    return parseInt(s, 10);
}

function analyze(doc) {
    var code = analyzer.getAllScriptsCode(doc),
        caractRegex = /\$\('(\w+)'\)\.innerHTML = \((-?\d+)[\+\/](-?\d+)\)/g,
        caracts = {},
        data;

    // find all lines looking like: "$('sPVBase').innerHTML = (109+39);"
    code.replace(caractRegex, function(match, name, value1, value2) {
        caracts[name] = [value1, value2];
    });

    data = {
        barbe: int(caracts.sBarbe[0]) / int(caracts.sBarbe[1]),
        vie: int(caracts.sPV[0]) + int(caracts.sPV[1]),
        vieBase: int(caracts.sPVBase[0]),
        vieBonus: int(caracts.sPVBase[1]),
        forceBase: int(caracts.sForce[0]),
        forceBonus: int(caracts.sForce[1]),
        precisionBase: int(caracts.sPrecis[0]),
        precisionBonus: int(caracts.sPrecis[1]),
        intelligenceBase: int(caracts.sIntell[0]),
        intelligenceBonus: int(caracts.sIntell[1]),
        honneurBase: int(caracts.sPG[0]),
        honneurBonus: int(caracts.sPG[1])
        /* TODO: sBarbeCible & sBarbeChasseur */
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