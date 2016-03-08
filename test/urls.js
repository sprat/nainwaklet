var test = require('tape-catch'),
    urls = require('../lib/urls');


test('urls.getPageUrl', function (assert) {
    assert.strictEqual(urls.getPageUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
    assert.end();
});

test('urls.getImageUrl', function (assert) {
    assert.strictEqual(urls.getImageUrl('avatar/perso/test.png'), 'http://www.nainwak.com/images/avatar/perso/test.png', 'Image URL');
    assert.end();
});

test('urls.isGameUrl', function (assert) {
    assert.ok(urls.isGameUrl('http://www.nainwak.com/jeu/index.php'), 'Canonical game url');
    assert.ok(urls.isGameUrl('http://nainwak.com/jeu/index.php'), 'No www game url');
    assert.ok(urls.isGameUrl('https://www.nainwak.com/jeu/index.php'), 'Https game url');
    assert.notOk(urls.isGameUrl('http://www.nainwak.com/'), 'Nainwak, but not game 1');
    assert.notOk(urls.isGameUrl('http://www.nainwak.com/jeu/even.php'), 'Nainwak, but not game 2');
    assert.notOk(urls.isGameUrl('http://www.google.fr'), 'External url');
    assert.end();
});
