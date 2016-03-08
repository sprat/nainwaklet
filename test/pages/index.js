var test = require('tape-catch'),
    pages = require('../../lib/pages');


test('pages.list', function (assert) {
    assert.ok(pages.list.length > 0, 'Non-empty list');
    assert.strictEqual(pages.list[0].name, 'detect', 'First element is the detect page');
    assert.end();
});

test('pages.byName', function (assert) {
    assert.strictEqual(pages.byName('detect').name, 'detect', 'Detect page by name');
    assert.strictEqual(pages.byName('blabla'), undefined, 'Invalid name');
    assert.end();
});

test('pages.byUrl', function (assert) {
    var detectPage = pages.byUrl('http://www.nainwak.com/jeu/detect.php');
    assert.strictEqual(detectPage, pages.byName('detect'), 'Detect page');

    var evenPage = pages.byUrl('http://www.nainwak.com/jeu/even.php?duree=240&typeALL');
    assert.strictEqual(evenPage, pages.byName('even'), 'Event page with query string');

    var invalidPage = pages.byUrl('http://www.nainwak.com/jeu/invalid.php');
    assert.strictEqual(invalidPage, undefined, 'Invalid page');

    assert.end();
});
