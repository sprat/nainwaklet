/*global require:true */
/*exported require */
var require = {
    //urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'js',
    paths: {
        'require': 'vendor/require',
        'text': 'vendor/text'
    },
    packages: ['nany', 'nany/nainwak']
};
