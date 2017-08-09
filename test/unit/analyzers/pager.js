var test = require('tape-catch');
var analyzePager = require('src/analyzers/pager');
var parseHTMLDocument = require('test/utils/parse-html-document');
var inventHTML = require('test/fixtures/invent.html');
var inventDocument = parseHTMLDocument(inventHTML);
var now = new Date(1457780950000);

test('analyzePager', function (assert) {
    var pager = analyzePager(inventDocument, now);

    assert.deepEqual(pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'pager data');

    assert.end();
});
