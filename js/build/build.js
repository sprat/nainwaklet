/*eslint-env node */
/*eslint-disable no-console */

var fs = require('fs'),
    path = require('path'),
    requirejs = require('requirejs'),
    amdclean = require('amdclean'),
    uglifyJS = require('uglify-js'),
    buildDir = __dirname,
    srcDir = path.join(buildDir, '..'),
    distDir = path.join(srcDir, '..', 'dist'),
    requireConfig = path.join(srcDir, 'require-config.js'),
    preambleFile = path.join(buildDir, 'preamble.js'),
    preamble = fs.readFileSync(preambleFile, 'utf-8');

// transform AMD modules to regular modules with AMDclean
function cleanAMD(source, outputFile, globalModules) {
    'use strict';

    console.log('- Cleaning the AMD modules...');

    var outputFilename = path.basename(outputFile),
        srcPath = path.relative(outputFile, srcDir),
        srcRoot = srcPath.split(path.sep).join('/'),  // convert path to url
        result;

    result = amdclean.clean(source.code, {
        globalModules: globalModules,
        sourceMap: source.map,
        wrap: false, // can't use that with sourceMap options
        removeUseStricts: false,  // keep 'use strict' statements
        esprima: {
            loc: true,
            source: outputFilename
        },
        escodegen: {
            sourceMap: true,
            sourceMapWithCode: true,
            /* FIXME: can't find a way to preserve the sourcesContent info from
             * the input source map into the target source map, so we need to
             * set the source map root
             */
            sourceMapRoot: srcRoot
        }
        //aggressiveOptimizations: false,
        //transformAMDChecks: false
    });
    // escodegen does not add the source map line by itself
    result.code += '\n//# sourceMappingURL=' + outputFilename + '.map';
    return result;
}

// compress with uglifyJS
function compress(source, outputFile) {
    'use strict';

    console.log('- Compressing...');

    var outputFilename = path.basename(outputFile);

    return uglifyJS.minify(source.code, {
        fromString: true,
        inSourceMap: JSON.parse(source.map),
        outSourceMap: outputFilename + '.map',
        wrap: true,
        output: {
            preamble: preamble
            //comments: /^!/  // keep comments starting with '!'
        }
    });
}

function build(moduleName) {
    'use strict';

    console.log('Build started');
    console.log('- Optimizing the AMD modules...');
    requirejs.optimize({
        baseUrl: srcDir,
        mainConfigFile: requireConfig,
        name: moduleName,
        useStrict: true,
        wrap: {
            start: preamble + '\n'
        },
        findNestedDependencies: true,  // optimize nested dependencies too
        optimize: 'none',  // don't compress yet, it will be done at a later stage
        generateSourceMaps: true,  // generate source maps
        preserveLicenseComments: false,  // unset because it interferes with generateSourceMaps
        out: function (code, map) {
            var outputFile = path.join(distDir, moduleName + '.min.js'),
                outputFilename = path.basename(outputFile),
                source = {
                    code: code,
                    map: map
                };

            source = cleanAMD(source, outputFilename, [moduleName]);
            source = compress(source, outputFilename);

            fs.writeFileSync(outputFile, source.code);
            fs.writeFileSync(outputFile + '.map', source.map);

            console.log('Build finished');
        }
    });
}

build('nany');
