var test = require('tape-catch');
var analyzeObjets = require('src/analyzers/objets');
var parseHTMLDocument = require('../parse-html-document');
var inventHTML = require('../fixtures/invent.html');
var inventDocument = parseHTMLDocument(inventHTML);
var transfertHTML = require('../fixtures/transfert.html');
var transfertDocument = parseHTMLDocument(transfertHTML);
var now = new Date(1457780950000);

test('analyzeObjets: invent.html', function (assert) {
    var objets = analyzeObjets(inventDocument, now);

    assert.deepEqual(objets.inventaire[0], {
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
    }, 'inventaire 1 : arquebuse naine');

    assert.deepEqual(objets.inventaire[3], {
        id: 25183956,
        nom: 'Batte de base-ball spéciale',
        image: '/images/objets/batte.gif',
        description: "T'es Ok !  T'es In !  T'es Batte ...",
        type: 'arme',
        PAutiliser: 8,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 70,
        PVmax: 100,
        PAreparer: 19,
        dispo: -259682,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2159518
    }, 'inventaire 4 : batte de base-ball spéciale');

    assert.deepEqual(objets.inventaire[8], {
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
    }, 'inventaire 9 : visée à poisson');

    assert.deepEqual(objets.inventaire[10], {
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
    }, 'inventaire 11 : pigeon voyageur');

    assert.deepEqual(objets.inventaire[18], {
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
    }, 'inventaire 19 : fée cabossée');

    assert.deepEqual(objets.inventaire[19], {
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
    }, 'inventaire 20 : kine d\'heure');

    assert.deepEqual(objets.inventaire[25], {
        id: 25170640,
        nom: 'Main collante de gosse',
        image: '/images/objets/main_collante.gif',
        description: "Les Gosses c'est Bien mais qu'est ce que c'est collant ...",
        type: 'special',
        PAutiliser: 2,
        portee: 0,
        dommages: 0,
        rechargement: 0,
        PV: 1,
        PVmax: 3,
        PAreparer: 0,
        dispo: -200591,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: false,
        poussiere: 2330050
    }, 'inventaire 26 : main collante');

    assert.deepEqual(objets.inventaire[26], {
        id: 25170639,
        nom: 'Tarte à la crème',
        image: '/images/objets/tarte_creme.gif',
        description: 'les chaines de télé culturelles sont importantes lorsque la religion part en fumée..<br /><br />',
        type: 'arme',
        PAutiliser: 4,
        portee: 4,
        dommages: 0,
        rechargement: 1,
        PV: 100,
        PVmax: 100,
        PAreparer: 2,
        dispo: -407945,
        forceBonus: 0,
        precisionBonus: 0,
        vieBonus: 0,
        intelligenceBonus: 0,
        collant: false,
        reparable: true,
        poussiere: 2011255
    }, 'inventaire 27 : tarte à la crème');

    assert.end();
});

test('analyzeObjets: transfert.html', function (assert) {
    var objets = analyzeObjets(transfertDocument, now);

    assert.deepEqual(objets.sol[0], {
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
    }, 'sol 1 : bouteille vide');

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
    }, 'inventaire 1 : arquebuse naine');

    assert.end();
});
