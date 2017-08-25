var test = require('tape-catch');
var analyzePerso = require('src/analyzers/perso');
var createPerso = require('test/fixtures/create-perso');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var html = require('test/fixtures/perso.html');
var now = new Date(1457780950000);

test('analyzers/perso: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var perso = analyzePerso(doc, now);

    assert.deepEqual(perso, createPerso(), 'perso data');

    assert.end();
});
