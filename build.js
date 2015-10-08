/*global __dirname */
/* eslint-disable no-console */
var fs = require('fs'),
    path = require('path'),
    requirejs = require('requirejs'),
    amdclean = require('amdclean'),
    root = __dirname,
    startLines = [
        '/*!',
        ' * Nainy application & library',
        ' * https://github.com/sprat/nany',
        ' *',
        ' * Copyright 2015 by Sylvain Prat',
        ' * Released under the MIT licence.',
        ' *',
        ' * THIS IS A GENERATED FILE, DO NOT EDIT',
        ' */',
        ';(function() {'
    ],
    endLines = [
        '}());'
    ];

console.log('Building the distribution...');
requirejs.optimize({
    findNestedDependencies: true,  // optimize nested dependencies too
    mainConfigFile: path.join(root, 'require-config.js'),
    name: 'nany',
    optimize: 'none',
    paths: {
        'nany/settings': 'nany/settings.build'
    },
    out: path.join(root, 'dist/nany.js'),
    onModuleBundleComplete: function(data) {
        var outputFile = data.path,
            cleaned = amdclean.clean({
                filePath: outputFile,
                globalModules: ['nany'],
                //aggressiveOptimizations: false,
                //transformAMDChecks: false
                wrap: {
                    start: startLines.join('\n') + '\n',
                    end: '\n' + endLines.join('\n')
                }
            });
        // TODO: uglify
        fs.writeFileSync(outputFile, cleaned);
        console.log('Build OK');
    }
});