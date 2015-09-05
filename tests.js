/*global
    Nainwaklet, QUnit, $, jslint
 */
/*jslint
    devel: true
 */

(function () {
    'use strict';

    function loadUrl(assert, url, processResponse) {
        var done = assert.async(),
            fail = function () {
                assert.ok(false, 'File not found: ' + url);
            };

        $.ajax({
            url: url,
            dataType: 'text'  // load url as text, don't try to parse or execute
        }).done(processResponse).fail(fail).always(done);
    }

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
        loadUrl(assert, 'fixtures/detect.html', function (response) {
            var info = detect.analyze(response);
            assert.strictEqual(info.localization.position[0], 13, 'X-position is valid');
            assert.strictEqual(info.localization.position[1], 5, 'Y-position is valid');
            assert.strictEqual(info.localization.world, 'Ronain Graou', 'World is valid');

            // TODO: add more tests about dwarfs & objects
        });
    });

    QUnit.test('JSLint', function (assert) {
        function checkSource(url) {
            loadUrl(assert, url, function (source) {
                var analysis = jslint(source);
                assert.ok(analysis.ok, url);
            });
        }

        checkSource('nainwaklet.js');
        checkSource('tests.js');
    });
}());