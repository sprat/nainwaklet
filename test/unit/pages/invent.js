var test = require('tape-catch');
var inventPage = require('src/pages/invent');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var inventHTML = require('test/fixtures/invent-enhancement.html');
var inventDocument = parseHTMLDocument(inventHTML);

test('inventPage.analyze', function (assert) {
    var jeu = {
        perso: createPerso()
    };

    var analysis = inventPage.analyze(inventDocument, new Date(), jeu);

    var objets = analysis.objets;
    assert.equal(objets.bonnet.length, 1, 'analysis: objets in bonnet');
    assert.equal(objets.inventaire.length, 14, 'analysis: objets in inventaire');

    assert.deepEqual(analysis.pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'analysis: pager');

    // TODO: test that objets is really updated, not replaced
    assert.deepEqual(jeu.objets, objets, 'jeu: objets');

    assert.equal(jeu.perso.vieTotal, 134, 'jeu: perso.vieTotal');
    assert.equal(jeu.perso.force, 25, 'jeu: perso.force');
    assert.equal(jeu.perso.precision, 325, 'jeu: perso.precision');
    assert.equal(jeu.perso.intelligence, 90, 'jeu: perso.intelligence');
    assert.equal(jeu.perso.vie, 149, 'jeu: perso.vie');

    assert.end();
});

// TODO: check enhancement
