var test = require('tape-catch');
var Urls = require('../urls');


test('Urls.getPageUrl', function (assert) {
    assert.strictEqual(Urls.getPageUrl('detect'), '/jeu/detect.php', 'Detect URL');
    assert.end();
});

test('Urls.getImageUrl', function (assert) {
    assert.strictEqual(Urls.getImageUrl('avatar/perso/test.png'), '/images/avatar/perso/test.png', 'Image URL');
    assert.end();
});
