/* global QUnit */
define(['nany/urls'], function (urls) {
    'use strict';

    QUnit.module('nany/urls');

    QUnit.test('gameUrl', function (assert) {
        assert.strictEqual(urls.gameUrl(), 'http://www.nainwak.com/jeu/index.php', 'Default URL is the index page');
        assert.strictEqual(urls.gameUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
    });

    QUnit.test('imageUrl', function (assert) {
        assert.strictEqual(urls.imageUrl('avatar/perso/test.png'), 'http://www.nainwak.com/images/avatar/perso/test.png', 'Image URL');
    });

    QUnit.test('isInGame', function (assert) {
        var window = {},
            link = document.createElement('a');

        // Note: the link will mimick the location API
        window.location = link;

        link.href = urls.gameUrl();
        assert.ok(urls.isInGame(window), 'Game window');

        link.href = 'http://www.google.com';
        assert.notOk(urls.isInGame(window), 'Non-game window');
    });
});