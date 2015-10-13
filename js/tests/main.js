/* global QUnit */
var tests = [
    'tests/utils/base64',
    'tests/nany/nainwak',
    'tests/nany/detect'
];

// don't start QUnit yet
QUnit.config.autostart = false;

// load the test modules and start QUnit
require(tests, function () {
    QUnit.start();
});
