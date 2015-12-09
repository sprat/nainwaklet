/*global require:true */
/*exported require */
var require = {
    //urlArgs: 'cachebust=' + (new Date()).getTime(),  // prevents caching
    baseUrl: 'js',
    paths: {
        'require': 'vendor/require',
        'text': 'vendor/text',
        'pubnub': 'vendor/pubnub',
        'tiny-emitter': 'vendor/tiny-emitter'
    },
    shim: {
        'pubnub': {
            exports: 'PUBNUB'
        }
    },
    config: {
        'nany/channel': {
            publishKey: 'pub-c-8be41a11-cbc5-4427-a5ad-e18cf5a466e4',
            subscribeKey: 'sub-c-38ae8020-6d33-11e5-bf4b-0619f8945a4f'
        }
    },
    packages: ['nany', 'nany/nainwak']
};
