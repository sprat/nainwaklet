(function() {
    'use strict';

    var tests = [
        'tests/utils/base64',
        'tests/utils/htmlentities',
        'tests/utils/htmldocument',
        'tests/nany/urls',
        'tests/nany/channel',
        'tests/nany/pages/main',
        'tests/nany/pages/detect'
    ];

    // don't start QUnit yet
    QUnit.config.autostart = false;

    // load the test modules and start QUnit
    require(tests, function () {
        QUnit.start();
    });
}());
