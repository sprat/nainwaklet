var test = require('tape'),
    urls = require('../urls');


test('urls: getPageUrl', function (assert) {
    assert.strictEqual(urls.getPageUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
    assert.end();
});

test('urls: getImageUrl', function (assert) {
    assert.strictEqual(urls.getImageUrl('avatar/perso/test.png'), 'http://www.nainwak.com/images/avatar/perso/test.png', 'Image URL');
    assert.end();
});

test('urls: gameUrl', function (assert) {
    assert.strictEqual(urls.gameUrl, 'http://www.nainwak.com/jeu/index.php', 'Game URL is the index page');
    assert.end();
});

test('urls: isInGame', function (assert) {
    var window = {},
        link = document.createElement('a');

    // Note: the link will mimick the location API
    window.location = link;

    link.href = urls.gameUrl;
    assert.ok(urls.isInGame(window), 'Game window');

    link.href = 'http://www.google.com';
    assert.notOk(urls.isInGame(window), 'Non-game window');

    assert.end();
});
