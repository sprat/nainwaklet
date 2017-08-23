var test = require('tape-catch');
var analyzeJoueur = require('src/analyzers/joueur');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var menuHTML = require('test/fixtures/menu.html');
var menuDocument = parseHTMLDocument(menuHTML);
var now = new Date(1457780950000);

test('analyzers/joueur: analyze', function (assert) {
    var joueur = analyzeJoueur(menuDocument, now);

    assert.strictEqual(joueur.nom, 'Savate', 'nom');
    assert.strictEqual(joueur.avatar, '/images/avatar/perso/8b98d919a61b230e80a80a67d3ea9b80c8212f34.png', 'avatar');
    assert.strictEqual(joueur.ids, undefined, 'ids');  // can't set a location object in our test

    assert.end();
});
