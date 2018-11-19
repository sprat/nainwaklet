/* eslint-env node */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var srcDir = path.resolve(__dirname, 'src');
var testDir = path.resolve(__dirname, 'test');
var distDir = path.resolve(__dirname, 'www', 'dist');

var extractCSS = new ExtractTextPlugin('[name].css');
var uglify = new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
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
    resolve: {
        alias: {
            'src': srcDir
        }
    },
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
        uglify
    ]
};

/* Build configuration for the tests */
var testsConfig = {
    context: testDir,
    resolve: {
        alias: {
            'src': srcDir,
            'test': testDir
        }
    },
    entry: {
        'nany.integration_tests': ['./integration/index.js'],
        'nany.unit_tests': ['./unit/index.js']
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
