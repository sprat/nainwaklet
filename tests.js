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

    /*
    QUnit.test('createApplication', function (assert) {
        assert.ok(Nainwaklet.createApplication, 'Nainwaklet should have an "createApplication" function');
    });
    */

    QUnit.test('pages', function (assert) {
        var pages = Nainwaklet.pages;
        assert.ok(pages, 'Nainwaklet.pages available');
        assert.ok(pages.detect, 'The detect page is available directly');
        assert.strictEqual(pages.getByUrl('http://www.nainwak.com/jeu/detect.php'), pages.detect, 'Get the detect page by url');
    });

    QUnit.test('detect page', function (assert) {
        var detect = Nainwaklet.pages.detect;
        loadFixture(assert, 'fixtures/detect.html', function (response) {
            var info = detect.analyze(response);
            assert.strictEqual(info.localization.position[0] , 13, 'X-position is valid');
            assert.strictEqual(info.localization.position[1] , 5, 'Y-position is valid');
            assert.strictEqual(info.localization.world , 'Ronain Graou', 'World is valid');
        });
    });

    //TODO: add a jslint check for both nainwaklet.js and this file
}());