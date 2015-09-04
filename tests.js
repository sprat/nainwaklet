/*global
    QUnit
 */

(function () {
    'use strict';

    QUnit.module('Nainwaklet');

    QUnit.test('pages', function (assert) {
        assert.ok(Nainwaklet.pages, 'Nainwaklet should have a "pages" property');
    });

    QUnit.test('createApplication', function (assert) {
        assert.ok(Nainwaklet.createApplication, 'Nainwaklet should have an "createApplication" function');
    });
}());