define(['qunit', 'nany/nainwak'], function (QUnit, nainwak) {
    'use strict';

    QUnit.module('nainwak');

    QUnit.test('gameUrl', function (assert) {
        assert.strictEqual(nainwak.gameUrl(), 'http://www.nainwak.com/jeu/index.php', 'Default URL is the index page');
        assert.strictEqual(nainwak.gameUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
    });

    QUnit.test('imageUrl', function (assert) {
        assert.strictEqual(nainwak.imageUrl('avatar/perso/test.png'), 'http://www.nainwak.com/images/avatar/perso/test.png', 'Image URL');
    });

    QUnit.test('isInGame', function (assert) {
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

    QUnit.test('pages.list', function (assert) {
        var pages = nainwak.pages;
        assert.ok(pages.list.length > 0, 'Non-empty list');
        assert.strictEqual(pages.list[0].name, 'detect', 'First element is the detect page');
    });

    QUnit.test('pages.byName', function (assert) {
        var pages = nainwak.pages;
        assert.strictEqual(pages.byName('detect').name, 'detect', 'Detect page by name');
        assert.strictEqual(pages.byName('blabla'), undefined, 'Invalid name');
    });

    QUnit.test('pages.byUrl', function (assert) {
        var pages = nainwak.pages;
        assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/detect.php').name, 'detect', 'Detect page by URL');
        assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/invalid.php'), undefined, 'Invalid URL');
    });
});