/* global QUnit */
(function() {
    'use strict';

    var tests = [
        'tests/utils/base64',
        'tests/nany/nainwak',
        'tests/nany/detect',
        'tests/nany/channel'
    ];

    // don't start QUnit yet
    QUnit.config.autostart = false;

    // load the test modules and start QUnit
    require(tests, function () {
        QUnit.start();
    });
}());
