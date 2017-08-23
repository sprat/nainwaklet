var test = require('tape-catch');
var encycloAnalyzer = require('src/analyzers/encyclo');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var objvusHTML = require('test/fixtures/objvus.html');
var objvusDocument = parseHTMLDocument(objvusHTML);

test('analyzers/encyclo: analyzeListDocument', function (assert) {
    var encyclo = encycloAnalyzer.analyzeListDocument(objvusDocument);

    assert.strictEqual(encyclo.length, 250, 'number of elements in encyclo');

    assert.deepEqual(encyclo[0], {
        id: 34,
        nom: 'Ampli',
        types: ['arme']
    }, 'Ampli at index 0');

    assert.deepEqual(encyclo[232], {
        id: 355,
        nom: "Kine d'Heure",
        types: ['jouet', 'bouffe']
    }, "Kine d'Heure at index 232");

    assert.deepEqual(encyclo[248], {
        id: 461,
        nom: 'Super potion sonore',
        types: ['jouet', 'arme']
    }, 'Super potion sonore at index 248');

    assert.end();
});
