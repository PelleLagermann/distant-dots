var Webpack = require('webpack');
var Path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

const ddConfig = {
    entry: {
        dd: "./src/scripts/index.js"
    },    
    output: {
        path: Path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    plugins: [     
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

const demoConfig = {
    entry: {
        dd: "./src/scripts/index.js"
    },    
    output: {
        path: Path.join(__dirname, 'demo'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                use: ['style-loader', 'css-loader'],                
                test: /\.css$/
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [        
        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new Webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
        })
    ]
};

module.exports = [ddConfig, demoConfig];