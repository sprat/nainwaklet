var test = require('tape-catch');
var invent = require('src/pages/invent');
var dom = require('src/utilities/dom');
var Mounter = require('src/utilities/mounter');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var inventHTML = require('test/fixtures/invent.html');
var now = new Date(1457780950000);

test('pages/invent.analyze', function (assert) {
    var context = createContext();
    var doc = parseHTMLDocument(inventHTML);
    var analysis = invent.analyze(doc, now, context);
    var objets = analysis.objets;

    assert.strictEqual(objets.sol, undefined, 'analysis: number of objets in sol');
    assert.strictEqual(objets.bonnet.length, 1, 'analysis: number of objets in bonnet') ;
    assert.strictEqual(objets.inventaire.length, 14, 'analysis: number of objets in inventaire') ;

    assert.deepEqual(objets.bonnet[0], {
        id: 23779038,
        nom: 'Potion de respécialisation',
        image: '/images/objets/potion_reset.png',
        description: 'Le pôle emploi te propose de changer de métier en revalorisant ton XP. ',
        type: 'special',
        PAutiliser: 24,
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
        reparable: false,
        poussiere: -1
    }, 'bonnet[0] : potion de respécialisation');


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
    }, 'inventaire[0] : arquebuse naine');

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
    }, 'inventaire[3] : batte de base-ball spéciale');

    assert.deepEqual(objets.inventaire[5], {
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
    }, 'inventaire[5] : visée à poisson');

    assert.deepEqual(objets.inventaire[7], {
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
    }, 'inventaire[7] : pigeon voyageur');

    assert.deepEqual(objets.inventaire[9], {
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
    }, 'inventaire[9] : fée cabossée');

    assert.deepEqual(objets.inventaire[10], {
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
    }, 'inventaire[10] : kine d\'heure');

    assert.deepEqual(objets.inventaire[12], {
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
    }, 'inventaire[12] : main collante');

    assert.deepEqual(objets.inventaire[13], {
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
    }, 'inventaire[13] : tarte à la crème');

    assert.deepEqual(analysis.pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'analysis: pager');

    // check context
    assert.strictEqual(context.objets.sol.length, 1, 'context: objets in sol');
    assert.strictEqual(context.objets.bonnet.length, 1, 'context: objets in bonnet');
    assert.strictEqual(context.objets.inventaire.length, 14, 'context: objets in inventaire');

    assert.strictEqual(context.perso.vieTotal, 134, 'context: perso.vieTotal');
    assert.strictEqual(context.perso.force, 25, 'context: perso.force');
    assert.strictEqual(context.perso.precision, 325, 'context: perso.precision');
    assert.strictEqual(context.perso.intelligence, 90, 'context: perso.intelligence');
    assert.strictEqual(context.perso.vie, 149, 'context: perso.vie');

    assert.end();
});

test('pages/invent.enhance', function (assert) {
    var context = createContext();
    var mounter = Mounter('test');
    var doc = parseHTMLDocument(inventHTML);
    invent.analyze(doc, now, context);
    invent.enhance(doc, mounter, context);

    var boxes = dom.findAll('div[data-mounter="test"]', doc);
    assert.strictEqual(3, boxes.length);

    // Perso: precision=325 -> dommages * 4.05
    // Arquebuse naine: dommages=20
    assert.strictEqual(boxes[0].text(), 'Dégâts : entre 77 et 85');
    // Boomrang feu: dommages=30
    assert.strictEqual(boxes[1].text(), 'Dégâts : entre 115 et 128');
    // Revolver 6 coups: dommages=15
    assert.strictEqual(boxes[2].text(), 'Dégâts : entre 58 et 64');

    assert.end();
});

function createContext() {
    return {
        perso: createPerso(),
        objets: {
            sol: [{
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
            }],
            inventaire: [{
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
            }]
        }
    };
}
