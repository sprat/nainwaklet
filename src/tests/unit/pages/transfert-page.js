var test = require('tape-catch');
var parseHTMLDocument = require('../parse-html-document');
var pages = require('../../../pages');
var transfertPage = pages.byType('transfert');
var html = require('../fixtures/transfert.html');
var doc = parseHTMLDocument(html);
var now = new Date(1457780950000);

test('transfertPage.analyze: inventaire', function (assert) {
    var info = transfertPage.analyze(doc, now, {});

    // mip(3819679, "Bouteille vide", "objets/vinvide.gif", '' , "ramasser", "INUTILE", 0, 0, "0", 0, 100, 100, 0, 0, 0, 0, 0, 0, "N", "O", "1295996");
    assert.deepEqual(info.objets.sol[0], {
        id: 3819679,
        nom: 'Bouteille vide',
        image: '/images/objets/vinvide.gif',
        description: '',
        type: 'inutile',
        PAutiliser: 0,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: 0,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 1295996
    });

    // mip(25186146, "Arquebuse naine", "objets/arquebuse.gif", '' , "poser", "ARME", 10, 2, "20", 1, 100, 100, 7, -14264, 0, 0, 0, 0, "N", "O", "2404936");
    assert.deepEqual(info.objets.inventaire[0], {
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
    });

    assert.end();
});

test('transfertPage.analyze: pager', function (assert) {
    var info = transfertPage.analyze(doc, now, {});

    // miseajourpager('5', '167', '167', 'evenpagerlu', '?', 'chatpagerlu', '0', '15', '4', 'ffe4b3cbb54fbb388beba96acde1fb7c', 'NainXpress');
    assert.deepEqual(info.pager, {
        PA: 5,
        vie: 167,
        vieTotal: 167,
        position: [15, 4],
        messagesNonLus: 0,
        nainxpressNonLu: false
    });

    assert.end();
});
