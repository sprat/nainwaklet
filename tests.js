/*global
    Nainwaklet, QUnit, $, jslint, REPORT
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
        var $container = $('#jslint-reports');

        function reportSection(url, errors) {
            var $section = $('<section class="jslint-report"></section>'),
                $title = $('<h1></h1>').html(url);

            $section.append($title);
            $section.append(errors);
            return $section;
        }

        function checkSource(url) {
            loadUrl(assert, url, function (source) {
                var analysis = jslint(source),
                    errors = REPORT.error(analysis);

                assert.ok(analysis.ok, url);
                if (!analysis.ok) {
                    $container.append(reportSection(url, errors));
                }
            });
        }

        checkSource('nainwaklet.js');
        checkSource('tests.js');
    });
}());