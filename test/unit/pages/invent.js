var test = require('tape-catch');
var inventPage = require('src/pages/invent');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var inventHTML = require('test/fixtures/invent-enhancement.html');
var inventDocument = parseHTMLDocument(inventHTML);

test('inventPage.analyze', function (assert) {
    var context = {
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

    var analysis = inventPage.analyze(inventDocument, new Date(), context);

    var objets = analysis.objets;
    assert.strictEqual(objets.sol, undefined, 'analysis: objets in sol');
    assert.strictEqual(objets.bonnet.length, 1, 'analysis: objets in bonnet');
    assert.strictEqual(objets.inventaire.length, 14, 'analysis: objets in inventaire');

    assert.deepEqual(analysis.pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'analysis: pager');

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

// TODO: check enhancement
