/*global require, QUnit */
require.config({
    urlArgs: 'v=' + (new Date()).getTime(),  // prevents caching
    baseUrl: '../lib',
    paths: {
        'nainwaklet': '../nainwaklet',
        'test': '../test'
    },
    shim: {
        // TODO: split this script into AMD modules
        'nainwaklet': {
            exports: 'Nainwaklet'
        },
        'qunit': {
            exports: 'QUnit',
            init: function() {
                QUnit.config.autostart = false;
            }
        }
    }
});

require(['qunit', 'test/pages', 'test/detec'], function (QUnit) {
    QUnit.start();
});
