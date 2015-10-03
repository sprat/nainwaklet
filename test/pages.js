define(['app/pages', 'app/pages/detect'], function (pages, detect) {
    'use strict';

    QUnit.module('pages');

    QUnit.test('page by name', function (assert) {
        assert.strictEqual(pages.detect, detect, 'Detect page by name');
        assert.strictEqual(pages.blabla, undefined, 'Invalid name');
    });

    QUnit.test('page by url', function (assert) {
        assert.strictEqual(pages.getByUrl('http://www.nainwak.com/jeu/detect.php'), detect, 'Detect page by URL');
        assert.strictEqual(pages.getByUrl('http://www.nainwak.com/jeu/invalid.php'), undefined, 'Invalid URL');
    });
});