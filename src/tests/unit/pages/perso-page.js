var test = require('tape-catch');
var helpers = require('../helpers');
var pages = require('../../../pages');
var persoPage = pages.byType('perso');
var html = require('../fixtures/perso.html');
var doc = helpers.parseHTMLDocument(html);
var now = new Date(1457780950000);

test('persoPage.analyze', function (assert) {
    var info = persoPage.analyze(doc, now, {});
    var perso = info.perso;

    assert.deepEqual(perso, {
        nom: 'Palme',
        image: '/images/avatar_guilde/fade976ec961a21e13af618e54476d1a5c285d7a.png',
        rang: 'Ami(e) des nains-béciles (des bêtes)',
        classe: 'brave',
        barbe: 68.06,
        description: "Quitte à taper un petit level, tapez Rêveur ! Gagnant de la palme d'or du meilleur nom de nain.",
        arme: 'Tuba',
        tag: {
            guilde: {
                nom: 'Gorgones',
                couleur: '#DA6400'
            },
            perso: 'Hosse',
            type: 1
        },
        vie: 138,
        vieTotal: 148,
        vieBase: 109,
        vieBonus: 39,
        force: 4,
        forceBase: 31,
        forceBonus: -27,
        precision: 310,
        precisionBase: 310,
        precisionBonus: 0,
        intelligence: 112,
        intelligenceBase: 90,
        intelligenceBonus: 22,
        honneur: 1,
        honneurBase: 0,
        honneurBonus: 1,
        cote: 13,
        ridicule: 1,
        honte: 0,
        xp: 5,
        tues: 16,
        morts: 2,
        giflesDonnees: 186,
        giflesRecues: 0,
        cible: {
            nom: 'Nelson',
            classe: 'sadique',
            rang: 'Cancre (nain-culte)',
            barbe: 61.68
        },
        chasseurs: {
            nombre: 2,
            barbe: 54.80
        }
    });

    assert.end();
});
