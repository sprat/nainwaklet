require('./invent');
require('./transfert');

var test = require('tape-catch');
var pages = require('src/pages');


test('pages: list', function (assert) {
    assert.ok(pages.list.length > 0, 'liste non vide');
    assert.strictEqual(pages.list[0].type, 'detect', 'la première page est la détection');
    assert.end();
});

test('pages: byType', function (assert) {
    assert.strictEqual(pages.byType('detect').type, 'detect', 'page détection');
    assert.strictEqual(pages.byType('blabla'), undefined, 'nom de page invalide');
    assert.end();
});

test('pages: byPath', function (assert) {
    var detectPage = pages.byPath('/jeu/detect.php');
    assert.strictEqual(detectPage, pages.byType('detect'), 'page détection');

    var invalidPage = pages.byPath('/jeu/invalid.php');
    assert.strictEqual(invalidPage, undefined, 'url invalide');

    assert.end();
});
