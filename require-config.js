/*global require:true */
/*exported require */
var require = {
    urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'src',
    paths: {
        'require': 'vendor/require',
        'text': 'vendor/text',
        'qunit': 'vendor/qunit',
        'dist': '../dist',
        'images': '../images',
        'css': '../css'
    },
    packages: ['nany', 'nany/nainwak', 'tests']
};
