var test = require('tape-catch'),
    path = require('path'),
    fs = require('fs'),
    helpers = require('../helpers'),
    page = require('../../lib/pages/perso'),
    html = fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'perso.html'), 'utf8'),
    doc = helpers.parseHTMLDocument(html);


test('perso.analyze', function (assert) {
    var info = page.analyze(doc);

    /*
    [HosseGorgones] Palme
    Ami(e) des nains-béciles (des bêtes), Longueur de la barbe 68,06cm
    Armé de ton(ta) Tuba [perso]
    Quitte à taper un petit level, tapez Rêveur ! Gagnant de la palme d'or du meilleur nom de nain.
    Points de Vie   148/148 [109 +39]
    Force   4 [31 -27]
    Précision   310 [310 +0]
    Intelligence    112 [90 +22]
    Points d'Honneur    1 [0 +1]
    Points de Côté  13
    Points de Ridicule  1
    Points de Honte 0
    Points d'XP 5
    Nombre d'ennemis tués   16
    Nombre de morts 2
    Nombre de gifles données    186
    Nombre de gifles reçues 0
    Votre cible Nelson
    Cancre (nain-culte)
    Longueur de la barbe : 61,68cm
    Nombre de chasseurs 3 (Longueur moyenne de la barbe : 55cm)
    */

    assert.deepEqual(info, {
        barbe: 68.06,
        vie: 148,
        vieBase: 109,
        vieBonus: 39,
        forceBase: 31,
        forceBonus: -27,
        precisionBase: 310,
        precisionBonus: 0,
        intelligenceBase: 90,
        intelligenceBonus: 22
    });
    assert.end();
});