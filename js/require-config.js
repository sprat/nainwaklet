/*global require:true */
/*exported require */
var require = {
    urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'js',
    paths: {
        'require': 'vendor/require',
        'text': 'vendor/text',
        'qunit': 'vendor/qunit',
        'css': '../css'
    },
    packages: ['nany', 'nany/nainwak', 'tests']
};
