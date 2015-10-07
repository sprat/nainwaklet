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
    name: 'nainy',
    optimize: 'none',
    paths: {
        'nainy/settings': 'nainy/settings.build'
    },
    out: path.join(root, 'dist/nainy.js'),
    onModuleBundleComplete: function(data) {
        var outputFile = data.path,
            cleaned = amdclean.clean({
                filePath: outputFile,
                globalModules: ['nainy']
                //aggressiveOptimizations: false,
                //transformAMDChecks: false
            });
        // TODO: uglify
        fs.writeFileSync(outputFile, cleaned);
        console.log('Build OK');
    }
});