var test = require('tape-catch');
var transfert = require('src/pages/transfert');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var transfertHTML = require('test/fixtures/transfert.html');
var transfertDocument = parseHTMLDocument(transfertHTML);
var now = new Date(1457780950000);

test('pages/transfert.analyze', function (assert) {
    var context = createContext();
    var analysis = transfert.analyze(transfertDocument, now, context);
    var objets = analysis.objets;

    assert.strictEqual(objets.sol.length, 1, 'number of objets in sol') ;
    assert.strictEqual(objets.inventaire.length, 13, 'number of objets in inventaire') ;

    assert.deepEqual(objets.sol[0], {
        id: 3819679,
        nom: 'Visée à poisson',
        image: '/images/objets/faux_thon.gif',
        description: '',
        type: 'rune',
        PAutiliser: 0,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: 0,
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2418204
    }, 'sol[0] : visée à poisson');

    assert.deepEqual(objets.inventaire[0], {
        id: 25186146,
        nom: 'Arquebuse naine',
        image: '/images/objets/arquebuse.gif',
        description: '',
        type: 'arme',
        PAutiliser: 10,
        portee: 2,
        dommages: 20,
        rechargement: 1,
        PV: 100,
        PVmax: 100,
        PAreparer: 7,
        dispo: -14264,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2404936
    }, 'inventaire[0] : arquebuse naine');

    assert.end();
});

function createContext() {
    return {
        perso: createPerso()
    };
}
