var test = require('tape-catch');
var analyzeJoueur = require('src/analyzers/joueur');
var parseHTMLDocument = require('../parse-html-document');
var html = require('../fixtures/menu.html');
var doc = parseHTMLDocument(html);
var now = new Date(1457780950000);

test('analyzeMenu', function (assert) {
    var info = analyzeJoueur(doc, now, {});

    assert.strictEqual(info.nom, 'Savate');
    assert.strictEqual(info.avatar, '/images/avatar/perso/8b98d919a61b230e80a80a67d3ea9b80c8212f34.png');
    assert.strictEqual(info.ids, undefined);  // can't set a location object in our test

    assert.end();
});
