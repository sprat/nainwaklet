/*global
    QUnit, $, Nainwaklet
 */

(function () {
    'use strict';

    function loadFixture(assert, url, processResponse) {
        var done = assert.async(),
            fail = function () {
                assert.ok(false, 'Fixture not found: ' + url);
            };

        $.ajax({url: url})
            .done(processResponse)
            .fail(fail)
            .always(done);
    }

    /* Nainwaklet tests */
    QUnit.module('Nainwaklet');

    QUnit.test('pages', function (assert) {
        assert.ok(Nainwaklet.pages, 'Nainwaklet should have a "pages" property');
    });

    QUnit.test('createApplication', function (assert) {
        assert.ok(Nainwaklet.createApplication, 'Nainwaklet should have an "createApplication" function');
    });

    QUnit.test('detect', function (assert) {
        var detect = Nainwaklet.pages.get('detect');

        loadFixture(assert, 'fixtures/detect.html', function (response) {
            var info = detect.analyze(response);
            assert.strictEqual(info.localization.position[0] , 13, 'X-position is valid');
            assert.strictEqual(info.localization.position[1] , 5, 'Y-position is valid');
            assert.strictEqual(info.localization.world , 'Ronain Graou', 'World is valid');
        });
    });
}());