/* global QUnit */
define(['nany/pages'], function (pages) {
    'use strict';

    QUnit.module('nany/pages');

    QUnit.test('list', function (assert) {
        assert.ok(pages.list.length > 0, 'Non-empty list');
        assert.strictEqual(pages.list[0].name, 'detect', 'First element is the detect page');
    });

    QUnit.test('byName', function (assert) {
        assert.strictEqual(pages.byName('detect').name, 'detect', 'Detect page by name');
        assert.strictEqual(pages.byName('blabla'), undefined, 'Invalid name');
    });

    QUnit.test('byUrl', function (assert) {
        assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/detect.php').name, 'detect', 'Detect page');
        //TODO: we want the following test to pass
        //assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/even.php?duree=240&typeALL').name, 'even', 'Event page with query string');
        assert.strictEqual(pages.byUrl('http://www.nainwak.com/jeu/invalid.php'), undefined, 'Invalid page');
    });
});