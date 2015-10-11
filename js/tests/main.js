require(['qunit'], function (QUnit) {
    var tests = [
        'tests/nainwak',
        'tests/detect'
    ];

    // load the test modules and start QUnit
    require(tests, function () {
        QUnit.start();
    });
});
