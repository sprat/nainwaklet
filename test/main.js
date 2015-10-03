require(['../app/require-config.js', '../lib/vendor/qunit.js'], function () {
    var tests = [
        'test/nainwak',
        'test/pages',
        'test/detect'
    ];

    // don't autostart QUnit
    QUnit.config.autostart = false;

    // start QUnit after the test modules are loaded
    require(tests, function () {
        QUnit.start();
    });
});
