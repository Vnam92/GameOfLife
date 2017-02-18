
const webpackConfig = require('./webpack.config.js');
module.exports = function (config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'test/**/*test.js'
        ],
        preprocessors: {
            'test/**/*test.js': ['webpack']
        },
        webpack: webpackConfig,
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity,

        plugins: [
            require("karma-webpack"),
            require("karma-jasmine"),
            require('karma-chrome-launcher'),
            require('karma-mocha'),
            require('karma-mocha-reporter')
        ]
    })
};
