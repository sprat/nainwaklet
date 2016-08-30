var test = require('tape-catch'),
    urls = require('../lib/urls');


test('urls.getPageUrl', function (assert) {
    assert.strictEqual(urls.getPageUrl('detect'), '/jeu/detect.php', 'Detect URL');
    assert.end();
});

test('urls.getImageUrl', function (assert) {
    assert.strictEqual(urls.getImageUrl('avatar/perso/test.png'), '/images/avatar/perso/test.png', 'Image URL');
    assert.end();
});
