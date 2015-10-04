define(['app/nainwak'], function (nainwak) {
    'use strict';

    QUnit.module('app/nainwak');

    QUnit.test('gameUrl', function (assert) {
        assert.strictEqual(nainwak.gameUrl(), 'http://www.nainwak.com/jeu/index.php', 'Default URL is the index page');
        assert.strictEqual(nainwak.gameUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
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