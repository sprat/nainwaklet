/*global __dirname */
/* eslint-disable no-console */
var fs = require('fs'),
    path = require('path'),
    process = require('process'),
    requirejs = require('requirejs'),
    amdclean = require('amdclean'),
    uglifyJS = require('uglify-js'),
    jsDir = path.join(__dirname, '..'),
    distDir = path.join(jsDir, '..', 'dist'),
    preambleFile = path.join(__dirname, 'preamble.js');

console.log('Build started');
console.log('- Optimizing...');
requirejs.optimize({
    baseUrl: jsDir,
    mainConfigFile: path.join(jsDir, 'require-config.js'),
    name: 'nany',
    wrap: {
        startFile: preambleFile
    },
    out: path.join(distDir, 'nany.js'),
    findNestedDependencies: true,  // optimize nested dependencies too
    optimize: 'none',  // don't compress yet, it will be done at a later stage
    generateSourceMaps: true,  // generate source maps
    preserveLicenseComments: false,  // unset because it interferes with generateSourceMaps
    onModuleBundleComplete: function (data) {
        var outDir = path.dirname(data.path),
            uncompressedFile = path.basename(data.path),
            uncompressedFileMap = uncompressedFile + '.map',
            uncompressedFileMapDeclaration = '\n//# sourceMappingURL=' + uncompressedFileMap,
            compressedFile = uncompressedFile.replace('.js', '.min.js'),
            compressedFileMap = compressedFile + '.map',
            result;

        // change working dir
        process.chdir(outDir);

        // run amdclean
        console.log('- Cleaning the AMD modules...');
        result = amdclean.clean({
            filePath: uncompressedFile,
            sourceMap: fs.readFileSync(uncompressedFileMap, 'utf-8'),
            globalModules: [data.name],
            wrap: false, // do not use with sourceMapWithCode
            esprima: {
                source: uncompressedFile
            },
            escodegen: {
                file: uncompressedFile,
                sourceMap: true,
                sourceMapWithCode: true
            }
            //aggressiveOptimizations: false,
            //transformAMDChecks: false
        });
        fs.writeFileSync(uncompressedFile, result.code + uncompressedFileMapDeclaration);
        fs.writeFileSync(uncompressedFileMap, result.map);

        // run uglifyJS
        console.log('- Compressing...');
        result = uglifyJS.minify(uncompressedFile, {
            inSourceMap: uncompressedFileMap,
            outSourceMap: compressedFileMap,
            //warnings: true,
            output: {
                comments: /^!/  // keep comments starting with '!'
            }
        });
        fs.writeFileSync(compressedFile, result.code);
        fs.writeFileSync(compressedFileMap, result.map);

        console.log('Build finished');
    }
});
