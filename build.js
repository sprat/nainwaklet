/*global __dirname */
/* eslint-disable no-console */
var fs = require('fs'),
    path = require('path'),
    requirejs = require('requirejs'),
    amdclean = require('amdclean'),
    root = __dirname;

console.log('Building the distribution...');
requirejs.optimize({
    findNestedDependencies: true,  // optimize nested dependencies too
    mainConfigFile: path.join(root, 'require-config.js'),
    name: 'nainwaklet',
    optimize: 'none',
    paths: {
        'nainwaklet/settings': 'nainwaklet/settings.build'
    },
    out: path.join(root, 'dist/nainwaklet.js'),
    onModuleBundleComplete: function(data) {
        var outputFile = data.path,
            cleaned = amdclean.clean({
                filePath: outputFile,
                globalModules: ['nainwaklet']
                //aggressiveOptimizations: false,
                //transformAMDChecks: false
            });
        // TODO: uglify
        fs.writeFileSync(outputFile, cleaned);
        console.log('Build OK');
    }
});