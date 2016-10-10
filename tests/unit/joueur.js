var test = require('tape-catch');
var Joueur = require('src/joueur');
var parseHTMLDocument = require('./parse-html-document');
var html = require('./fixtures/menu.html');
var doc = parseHTMLDocument(html);

test('Nain.fromDocument', function (assert) {
    var joueur = Joueur.fromMenu(doc);

    assert.strictEqual(joueur.nom, 'Savate');
    assert.strictEqual(joueur.avatar, '/images/avatar/perso/8b98d919a61b230e80a80a67d3ea9b80c8212f34.png');
    assert.strictEqual(joueur.ids, undefined);  // can't set a location object in our test

    assert.end();
});
