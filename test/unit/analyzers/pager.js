var test = require('tape-catch');
var analyzePager = require('src/analyzers/pager');
var parseHTMLDocument = require('test/fixtures/parse-html-document');
var html = require('test/fixtures/invent.html');
var now = new Date(1457780950000);

test('analyzers/pager: analyze', function (assert) {
    var doc = parseHTMLDocument(html);
    var pager = analyzePager(doc, now);

    assert.deepEqual(pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'pager data');

    assert.end();
});
