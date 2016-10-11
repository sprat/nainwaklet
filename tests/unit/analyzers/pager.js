var test = require('tape-catch');
var parseHTMLDocument = require('../parse-html-document');
var analyzePager = require('src/analyzers/pager');
var html = require('../fixtures/invent.html');
var doc = parseHTMLDocument(html);
var now = new Date(1457780950000);

test('analyzePager', function (assert) {
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
