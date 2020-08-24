
const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: './src/js/main.js', // entry point
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // path to non-irl files to be served
        publicPath: '/js/', // url from where webpack files are served
        watchContentBase: true, // file changes trigger full reload
        compress: true, // gzip compression for served files
        port: 9000
    },
    output: {
        filename: '[name].bundle.js', 
    },
    module:{
        rules: [ // scss thing may be needed when SCSS is implemented
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },
    node: {
        fs: 'empty'
    }
};