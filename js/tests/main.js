/*global mocha, mochaPhantomJS */
define(function (require) {
    var tests = [
        'tests/nainwak',
        'tests/detect'
    ];

    // load the test modules and start QUnit
    require(tests, function () {
        if (window.mochaPhantomJS) {
            mochaPhantomJS.run();
        } else {
            mocha.run();
        }
    });
});
