var test = require('tape-catch');
var inventPage = require('src/pages/invent');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var inventHTML = require('test/fixtures/invent-enhancement.html');
var inventDocument = parseHTMLDocument(inventHTML);

test('inventPage.analyze', function (assert) {
    var jeu = {
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

    var analysis = inventPage.analyze(inventDocument, new Date(), jeu);

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

    assert.strictEqual(jeu.objets.sol.length, 1, 'jeu: objets in sol');
    assert.strictEqual(jeu.objets.bonnet.length, 1, 'jeu: objets in bonnet');
    assert.strictEqual(jeu.objets.inventaire.length, 14, 'jeu: objets in inventaire');

    assert.strictEqual(jeu.perso.vieTotal, 134, 'jeu: perso.vieTotal');
    assert.strictEqual(jeu.perso.force, 25, 'jeu: perso.force');
    assert.strictEqual(jeu.perso.precision, 325, 'jeu: perso.precision');
    assert.strictEqual(jeu.perso.intelligence, 90, 'jeu: perso.intelligence');
    assert.strictEqual(jeu.perso.vie, 149, 'jeu: perso.vie');

    assert.end();
});

// TODO: check enhancement
