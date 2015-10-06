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
        nainwakletDist: '../dist/nainwaklet.js',
        images: '../images'
    },
    packages: ['nainwaklet', 'nainwaklet/nainwak', 'tests']
};
