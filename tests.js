/*global
    Nainwaklet, document, QUnit, jslint
 */
/*jslint
    devel: true
 */

(function () {
    'use strict';

    /* when loading Nainwak test fixtures, we need to force the charset of the
     * response, otherwise we get encoding problems in some browsers...
     */
    var latin1FixtureOptions = {mimetype: 'text/html; charset=ISO-8859-1'};

    function getUrl(assert, url, options, processResponse) {
        var done = assert.async(),
            random = Math.floor(Math.random() * 1000000),
            requestUrl = url + '?v=' + random;  // prevents caching

        if (typeof options === 'function' && processResponse === undefined) {
            processResponse = options;
            options = {};
        }

        Nainwaklet.testing.ajaxRequest(requestUrl, options, function (response) {
            if (response.status === 200) {
                try {
                    processResponse(response.body);
                } catch (e) {
                    assert.ok(false, e);
                }
            } else {
                assert.ok(false, 'Error while fetching url ' + url + ': ' + response.status);
            }
            done();
        });
    }

    /*
    QUnit.test('createApplication', function (assert) {
        assert.ok(Nainwaklet.createApplication, 'Nainwaklet should have an "createApplication" function');
    });
    */

    QUnit.test('pages', function (assert) {
        var pages = Nainwaklet.testing.pages;
        assert.ok(pages, 'Nainwaklet.pages available');
        assert.ok(pages.detect, 'Get page by name');
        assert.strictEqual(pages.getByUrl('http://www.nainwak.com/jeu/detect.php'), pages.detect, 'Get page by url');
    });

    QUnit.test('detect page', function (assert) {
        var detect = Nainwaklet.testing.pages.detect;

        getUrl(assert, 'fixtures/detect.html', latin1FixtureOptions, function (response) {
            var info = detect.analyze(response);

            console.log(info);
            assert.deepEqual(info.position, [13, 5], 'Position');
            assert.strictEqual(info.monde, 'Monde des sadiques', 'Monde');

            var nains = info.nains;
            assert.strictEqual(nains.length, 3, 'Nombre de nains');

            //["33966", "avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png", "Le PheniX", '[Gnouille] [<span style="color:#91005D;">#!</span>]', "13799", "2", "Diablotin(e)", "0", "13", "5", "&quot;Le PheniX est un oiseau qui symbolise l&#039;immortalité et la résurrection.&quot; A quoi bon me tuer ?!?", "o", "", "0"];
            assert.deepEqual(nains[0], {
                id: 33966,
                nom: 'Le PheniX',
                avatar: 'http://www.nainwak.com/images/avatar_guilde/41ddb8ad2c2be408e27352accf1cc0b6559466bb.png',
                description: '"Le PheniX est un oiseau qui symbolise l\'immortalité et la résurrection." A quoi bon me tuer ?!?',
                position: [13, 5]
            }, 'Nain 1');

            //["33924", "avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png", "Bourinain", '[G-NOUILLE<span style="color:#00C200;">#sNOUFFF</span>]', "10314", "2", "Cancre (nain-culte)", "0", "13", "5", "Description", "o", "", "0"];
            assert.deepEqual(nains[1], {
                id: 33924,
                nom: "Nainkomp'",
                avatar: 'http://www.nainwak.com/images/avatar/perso/dab064da974199a53f0e22527f901d523e8869b3.png',
                description: 'Description',
                position: [14, 5]
            }, 'Nain 2');

            // TODO: add more tests about objects
        });
    });

    QUnit.test('JSLint', function (assert) {
        function formatWarnings(analysis, source) {
            var sourceLines = source.split(/\r?\n/g),
                warnings = [];

            analysis.warnings.forEach(function (warning) {
                var str = '@ line ' + warning.line + ' column ' + warning.column + ': '
                        + warning.message + '\n'
                        + sourceLines[warning.line];
                warnings.push(str);
            });

            return warnings.join('\n\n');
        }

        function checkSource(url) {
            getUrl(assert, url, function (source) {
                var analysis = jslint(source),
                    warnings = formatWarnings(analysis, source);

                assert.strictEqual(warnings, '', url);
            });
        }

        checkSource('nainwaklet.js');
        checkSource('tests.js');
    });
}());