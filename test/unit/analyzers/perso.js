var test = require('tape-catch');
var analyzePerso = require('src/analyzers/perso');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var persoHTML = require('test/fixtures/perso.html');
var persoDocument = parseHTMLDocument(persoHTML);
var now = new Date(1457780950000);

test('analyzers/perso: analyze', function (assert) {
    var perso = analyzePerso(persoDocument, now);

    assert.deepEqual(perso, createPerso(), 'perso data');

    assert.end();
});
