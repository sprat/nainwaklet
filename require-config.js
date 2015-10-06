/*global require:true */
/*exported require */
var require = {
    urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'src',
    paths: {
        nainwaklet: 'nainwaklet',
        utils: 'utils',
        require: 'vendor/require',
        text: 'vendor/text',
        qunit: 'vendor/qunit',
        tests: 'tests',
        dist: '../dist',
        images: '../images'
    },
    packages: ['nainwaklet', 'nainwaklet/nainwak', 'tests']
};
