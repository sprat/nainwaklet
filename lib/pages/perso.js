var Page = require('./page'),
    analyzer = require('./analyzer');

function int(s) {
    return parseInt(s, 10);
}

function analyze(doc) {
    var code = analyzer.getAllScriptsCode(doc),
        caracts = {},
        caractRegex = /\$\('(\w+)'\)\.innerHTML = \((\d+)[\+\/](-?\d+)\)/gi;

    // find all lines looking like: "$('sPVBase').innerHTML = (109+39);"
    code.replace(caractRegex, function(match, name, value1, value2) {
        caracts[name] = [value1, value2];
    });

    return {
        barbe: int(caracts.sBarbe[0]) / int(caracts.sBarbe[1]),
        vie: int(caracts.sPV[0]) + int(caracts.sPV[1]),
        vieBase: int(caracts.sPVBase[0]),
        vieBonus: int(caracts.sPVBase[1]),
        forceBase: int(caracts.sForce[0]),
        forceBonus: int(caracts.sForce[1]),
        precisionBase: int(caracts.sPrecis[0]),
        precisionBonus: int(caracts.sPrecis[1]),
        intelligenceBase: int(caracts.sIntell[0]),
        intelligenceBonus: int(caracts.sIntell[1])
    };
}

module.exports = Page('perso', analyze);