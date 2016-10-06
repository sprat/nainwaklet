var test = require('tape-catch');
var parseHTMLDocument = require('../parse-html-document');
var pages = require('../../../pages');
var inventPage = pages.byType('invent');
var html = require('../fixtures/invent.html');
var doc = parseHTMLDocument(html);
var now = new Date(1457780950000);

test('inventPage.analyze: objets', function (assert) {
    var info = inventPage.analyze(doc, now, {});

    assert.deepEqual(info.objets.inventaire[0], {
        id: 25186146,
        nom: 'Arquebuse naine',
        image: '/images/objets/arquebuse.gif',
        description: "A la différence d'un arc classique, cette arme utilise un projectile vivant : un oiseau. D’où son nom arc-buse. Ce modèle miniaturisé peut tenir dans une armoire portable ... de nain",
        type: 'arme',
        PAutiliser: 10,
        portee: 2,
        dommages: 20,
        rechargement: 1,
        PV: 45,
        PVmax: 100,
        PAreparer: 7,
        dispo: -6665,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2412535
    });

    assert.deepEqual(info.objets.inventaire[8], {
        id: 25183959,
        nom: 'Visée à poisson',
        image: '/images/objets/faux_thon.gif',
        description: "Technologie avancée. La \"visée à poisson\" accélère des poissons en plastique (les faux-thons) afin de les propulser sur la cible. (La visée laser s'en est d'ailleurs inspirée)",
        type: 'rune',
        PAutiliser: 0,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: -6,
        precisionBonus: 15,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2229326
    });

    assert.deepEqual(info.objets.inventaire[10], {
        id: 25183960,
        nom: 'Pigeon voyageur',
        image: '/images/objets/pigeon.gif',
        description: "C'est le nouveau modèle de la marque automobile. En effet le Pigeon Voyageur outrepasse les lois terrestres pour emmener son conducteur au 7ème ciel.",
        type: 'detecteur',
        PAutiliser: 0,
        portee: 8,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2229334
    });

    assert.deepEqual(info.objets.inventaire[18], {
        id: 25134600,
        nom: 'Fée Cabossée',
        image: '/images/objets/fee.png',
        description: "Mais pourquoi la fée cabossée ? - Rhoo on s'en cogne !",
        type: 'special',
        PAutiliser: 5,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 100,
        PVmax: 100,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: true,
        reparable: false,
        poussiere: -1
    });

    assert.deepEqual(info.objets.inventaire[19], {
        id: 25159237,
        nom: "Kine d'Heure",
        image: '/images/objets/kinder.gif',
        description: "Kine d'heure, au bon chocolat et au lait, et peut-être une surprise à l'intérieur ?",
        type: 'manger',
        PAutiliser: 0,
        portee: 0,
        dommages: -76,
        rechargement: 40,
        PV: 0,
        PVmax: 0,
        PAreparer: 0,
        dispo: -189893,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 951613
    });

    assert.end();
});

test('inventPage.analyze: pager', function (assert) {
    var info = inventPage.analyze(doc, now, {});

    // miseajourpager('2', '149', '159', 'evenpagerlu', '?', 'chatpagerlu', '0', '14', '7', '305033d8ab52e3547c32fe17046b09d7', 'NainXpress');
    assert.deepEqual(info.pager, {
        PA: 2,
        vie: 149,
        vieTotal: 159,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    });

    assert.end();
});

test('inventPage.analyze: context updates', function (assert) {
    var context = {
        perso: {
            PA: 0,
            vie: 50,
            vieTotal: 100,
            forceBonus: 0,
            precisionBonus: 0,
            vieBonus: 0,
            intelligenceBonus: 0
        }
    };

    inventPage.analyze(doc, now, context);

    // CD-ROM + OVNI + Un peu d'amour en bocal + Un peu d'amour en bocal + Visée à poisson
    assert.deepEqual(context.perso, {
        PA: 2,
        vie: 149,
        vieTotal: 159,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false,
        forceBonus: -10,
        precisionBonus: 30,
        intelligenceBonus: 10,
        vieBonus: 49
    });

    assert.end();
});
