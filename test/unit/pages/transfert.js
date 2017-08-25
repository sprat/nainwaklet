var test = require('tape-catch');
var transfert = require('src/pages/transfert');
var dom = require('src/utilities/dom');
var Mounter = require('src/utilities/mounter');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var html = require('test/fixtures/transfert.html');
var now = new Date(1457780950000);

test('pages/transfert: analyze', function (assert) {
    var context = createContext();
    var doc = parseHTMLDocument(html);
    var analysis = transfert.analyze(doc, now, context);
    var objets = analysis.objets;

    assert.ok(analysis.raw, 'analysis: raw data is present');

    assert.strictEqual(objets.bonnet, undefined, 'analysis: number of objets in bonnet') ;
    assert.strictEqual(objets.sol.length, 1, 'analysis: number of objets in sol') ;
    assert.strictEqual(objets.inventaire.length, 13, 'analysis: number of objets in inventaire') ;

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

    assert.deepEqual(analysis.pager, {
        PA: 5,
        vie: 149,
        position: [15, 4],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'analysis: pager');

    // check context
    assert.strictEqual(context.objets.sol.length, 1, 'context: objets in sol');
    assert.strictEqual(context.objets.bonnet.length, 1, 'context: objets in bonnet');
    assert.strictEqual(context.objets.inventaire.length, 13, 'context: objets in inventaire');

    assert.strictEqual(context.perso.vieTotal, 134, 'context: perso.vieTotal');
    assert.strictEqual(context.perso.force, 31, 'context: perso.force');
    assert.strictEqual(context.perso.precision, 310, 'context: perso.precision');
    assert.strictEqual(context.perso.intelligence, 90, 'context: perso.intelligence');
    assert.strictEqual(context.perso.vie, 149, 'context: perso.vie');

    assert.end();
});

test('pages/transfert: enhance', function (assert) {
    var context = createContext();
    var mounter = Mounter('test');
    var doc = parseHTMLDocument(html);
    transfert.analyze(doc, now, context);
    transfert.enhance(doc, mounter, context);

    var boxes = dom.findAll('div[data-mounter="test"]', doc);
    assert.strictEqual(3, boxes.length);

    // Perso: precision=310 -> dommages * 3.9
    assert.strictEqual(nomObjetBox(boxes[0]), 'Arquebuse naine');
    assert.strictEqual(boxes[0].text(), 'Dégâts : entre 74 et 82');  // dommages: 20
    assert.strictEqual(nomObjetBox(boxes[1]), 'Boomrang feu');
    assert.strictEqual(boxes[1].text(), 'Dégâts : entre 111 et 123');  // dommages: 30
    assert.strictEqual(nomObjetBox(boxes[2]), 'Revolver 6 coups');
    assert.strictEqual(boxes[2].text(), 'Dégâts : entre 56 et 61');  // dommages: 15

    assert.end();
});

function nomObjetBox(box) {
    return box.parent().parent().parent().find('.news-titre').text();
}

function createContext() {
    return {
        perso: createPerso(),
        objets: {
            bonnet: [{
                id: 23779038,
                nom: 'Potion de respécialisation',
                image: '/images/objets/potion_reset.png',
                description: 'Le pôle emploi te propose de changer de métier en revalorisant ton XP. ',
                type: 'jouet',
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
