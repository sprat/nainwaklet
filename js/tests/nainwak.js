/*global assert, suite, test */
define(['nany/nainwak'], function (nainwak) {
    'use strict';

    suite('nainwak', function () {
        test('gameUrl', function () {
            assert.strictEqual(nainwak.gameUrl(), 'http://www.nainwak.com/jeu/index.php', 'Default URL is the index page');
            assert.strictEqual(nainwak.gameUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
        });

        test('imageUrl', function () {
            assert.strictEqual(nainwak.imageUrl('avatar/perso/test.png'), 'http://www.nainwak.com/images/avatar/perso/test.png', 'Image URL');
        });

        test('isInGame', function () {
            var window = {},
                link = document.createElement('a');

            // Note: the link will mimick the location API
            window.location = link;

            link.href = nainwak.gameUrl();
            assert.ok(nainwak.isInGame(window), 'Game window');

            link.href = 'http://www.google.com';
            assert.notOk(nainwak.isInGame(window), 'Non-game window');
        });

        // TODO: test getNain

        test('pages.list', function () {
            var pages = nainwak.pages;
            assert.ok(pages.list.length > 0, 'Non-empty list');
            assert.strictEqual(pages.list[0].name, 'detect', 'First element is the detect page');
        });

        test('pages.byName', function () {
            var pages = nainwak.pages;
            assert.strictEqual(pages.byName('detect').name, 'detect', 'Detect page by name');
            assert.strictEqual(pages.byName('blabla'), undefined, 'Invalid name');
        });

        test('pages.byUrl', function () {
            var pages = nainwak.pages;
            assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/detect.php').name, 'detect', 'Detect page by URL');
            assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/invalid.php'), undefined, 'Invalid URL');
        });
    });

});