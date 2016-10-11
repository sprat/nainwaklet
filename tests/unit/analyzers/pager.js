var test = require('tape-catch');
var parseHTMLDocument = require('../parse-html-document');
var analyzePager = require('src/analyzers/pager');
var html = require('../fixtures/invent.html');
var doc = parseHTMLDocument(html);
var now = new Date(1457780950000);

test('analyzePager', function (assert) {
    var pager = analyzePager(doc, now);

    // miseajourpager('2', '149', '159', 'evenpagerlu', '?', 'chatpagerlu', '0', '14', '7', '305033d8ab52e3547c32fe17046b09d7', 'NainXpress');
    assert.deepEqual(pager, {
        PA: 2,
        vie: 149,
        position: [14, 7],
        messagesNonLus: 0,
        nainxpressNonLu: false
    }, 'Pager info');

    assert.end();
});
