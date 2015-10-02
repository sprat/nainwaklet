define(['nainwaklet', 'qunit'], function (Nainwaklet, QUnit) {
    'use strict';

    QUnit.test('pages', function (assert) {
        var pages = Nainwaklet.testing.pages;
        assert.ok(pages, 'Nainwaklet.pages available');
        assert.ok(pages.detect, 'Get page by name');
        assert.strictEqual(pages.getByUrl('http://www.nainwak.com/jeu/detect.php'), pages.detect, 'Get page by url');
    });
});