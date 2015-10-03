define(['app/nainwak'], function (nainwak) {
    'use strict';

    QUnit.module('nainwak');

    QUnit.test('gameUrl', function (assert) {
        assert.strictEqual(nainwak.gameUrl(), 'http://www.nainwak.com/jeu/index.php', 'Default URL is the index page');
        assert.strictEqual(nainwak.gameUrl('detect'), 'http://www.nainwak.com/jeu/detect.php', 'Detect URL');
    });
});