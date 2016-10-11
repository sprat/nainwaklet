require('./even');
require('./invent');
require('./transfert');

var test = require('tape-catch');
var pages = require('src/pages');

test('pages.list', function (assert) {
    assert.ok(pages.list.length > 0, 'Non-empty list');
    assert.strictEqual(pages.list[0].type, 'detect', 'First element is the detect page');
    assert.end();
});

test('pages.byType', function (assert) {
    assert.strictEqual(pages.byType('detect').type, 'detect', 'Detect page by name');
    assert.strictEqual(pages.byType('blabla'), undefined, 'Invalid name');
    assert.end();
});

test('pages.byUrl', function (assert) {
    var detectPage = pages.byUrl('/jeu/detect.php');
    assert.strictEqual(detectPage, pages.byType('detect'), 'Detect page');

    var invalidPage = pages.byUrl('/jeu/invalid.php');
    assert.strictEqual(invalidPage, undefined, 'Invalid page');

    assert.end();
});
