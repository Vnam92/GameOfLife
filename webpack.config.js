'use strict';

module.exports = {
    context: __dirname + "/js",
    entry: {
        controller: "./controller",
        model: "./model",
        view: "./view"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },

    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: "source-map",

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?optional[]=runtime'
            },
            {
                test: /\.css$/,
                loader: 'style.css'
            },
        ]
    }

};