/*global require:true QUnit */
/*exported require */
var require = {
    urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'js',
    paths: {
        'require': 'vendor/require',
        'text': 'vendor/text',
        'qunit': 'vendor/qunit'
    },
    shim: {
        'qunit': {
            exports: 'QUnit',
            init: function () {
                QUnit.config.autostart = false;  // don't start QUnit yet
            }
        }
    },
    packages: ['nany', 'nany/nainwak', 'tests']
};
