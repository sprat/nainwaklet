/*global require:true */
/*exported require */
var require = {
    //urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'js',
    paths: {
        'require': 'vendor/require',
        'text': 'vendor/text',
        'pubnub': 'vendor/pubnub'
    },
    shim: {
        'pubnub': {
            exports: 'PUBNUB'
        }
    },
    packages: ['nany', 'nany/nainwak']
};
