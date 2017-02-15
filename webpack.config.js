'use strict';
const path = require('path');

module.exports = {
    context: __dirname + "/js",
    entry: {
        controller: "./app",
        //model: "./model",
        // view: "./view"
    },
    output: {
        path: __dirname + "/public",
        publicPath: '/',
        filename: "bundle.js"
        // library: "[name]"
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 150
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }

};