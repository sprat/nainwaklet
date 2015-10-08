/*global __dirname */
/* eslint-disable no-console */
var fs = require('fs'),
    path = require('path'),
    process = require('process'),
    requirejs = require('requirejs'),
    amdclean = require('amdclean'),
    uglifyJS = require('uglify-js'),
    root = __dirname,
    dist = path.join(root, 'dist'),
    filenames = {
        uncompressed: 'nany.js',
        compressed: 'nany.min.js',
        map: 'nany.min.js.map'
    },
    preambleLines = [
        '/*!',
        ' * Nainy application & library',
        ' * https://github.com/sprat/nany',
        ' *',
        ' * Copyright 2015 by Sylvain Prat',
        ' * Released under the MIT licence.',
        ' *',
        ' * THIS IS A GENERATED FILE, DO NOT EDIT',
        ' */'
    ],
    preamble = preambleLines.join('\n') + '\n';

console.log('Build started');
console.log('- Optimizing...');
requirejs.optimize({
    mainConfigFile: path.join(root, 'require-config.js'),
    name: 'nany',
    findNestedDependencies: true,  // optimize nested dependencies too
    optimize: 'none',  // don't optimize yet, it will be done later
    paths: {
        'nany/settings': 'nany/settings.build'
    },
    out: path.join(dist, filenames.uncompressed),
    onModuleBundleComplete: function() {
        var cwd = process.cwd(),
            cleaned,
            compressed;

        // change working dir to dist dir
        process.chdir(dist);

        console.log('- Cleaning the AMD modules...');
        cleaned = amdclean.clean({
            filePath: filenames.uncompressed,
            globalModules: ['nany'],
            //aggressiveOptimizations: false,
            //transformAMDChecks: false
            wrap: {
                start: preamble + ';(function() {'
            }
        });

        console.log('- Saving the uncompressed file');
        fs.writeFileSync(filenames.uncompressed, cleaned);

        console.log('- Compressing...');
        compressed = uglifyJS.minify(filenames.uncompressed, {
            warnings: true,
            comments: /^!.*/,  // keep comments starting with '!'
            outSourceMap: filenames.map
        });

        console.log('- Saving the compressed file');
        fs.writeFileSync(filenames.compressed, preamble + compressed.code);

        console.log('- Saving the map file');
        fs.writeFileSync(filenames.map, compressed.map);

        // back to the previous directory
        process.chdir(cwd);

        console.log('Build finished');
    }
});