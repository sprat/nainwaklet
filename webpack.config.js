var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var root = __dirname;
var srcDir = path.join(root, 'src');
var testsDir = path.join(root, 'tests');
var distDir = path.join(root, 'dist');

var extractCSS = new ExtractTextPlugin('[name].css');
var dedupe = new webpack.optimize.DedupePlugin();
var uglify = new webpack.optimize.UglifyJsPlugin({
    //sourceMap: true,
    //mangle: true,
    output: {
        comments: false
    },
    compress: {
        warnings: false
    }
});

/* Build configuration for the application */
var applicationConfig = {
    context: srcDir,
    entry: {
        'nany': './index.js'
    },
    devtool: 'source-map',
    output: {
        path: distDir,
        filename: '[name].js',
        library: 'Nany',
        libraryTarget: 'umd',
        devtoolModuleFilenameTemplate: '[resource-path]'  // remove webpack:/// prefix
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract('css-loader?sourceMap&modules&localIdentName=[local]--[hash:base64:5]')
            }
        ]
    },
    plugins: [
        extractCSS,
        dedupe,
        uglify
    ]
};

/* Build configuration for the tests */
var testsConfig = {
    context: testsDir,
    resolve: {
        alias: {
            'src': srcDir
        }
    },
    entry: {
        'nany.tests': ['./index.js'],
        'nany.unittests': ['./unit/index.js']
    },
    devtool: 'source-map',
    output: {
        path: distDir,
        filename: '[name].js',
        devtoolModuleFilenameTemplate: '[resource-path]'  // remove webpack:/// prefix
    },
    node: {
        fs: 'empty'  // needed to support tape
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {  // we don't need CSS in tests? or use style-loader?
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    }
};

module.exports = [applicationConfig, testsConfig];
