/** @type {import('webpack').Configuration} */

// Importing the mode path from node
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        // assetModuleFilename: 'assets/[name][ext]',
        clean: true,
    },
    mode: 'development',
    devtool: 'source-map',
    // We don't need to optimize in dev mode
    // optimization: {
    //     minimize: true,
    // },
    // watch: true,
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 3080,
        open: true,
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
        },
    },
    // Load a module
    module: {
        rules: [
            {
                //select which files will the loader compile
                test: /\.m?js$/,
                // excluding files/folders
                exclude: /node_modules/,
                // sets which loader to use
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css|\.styl$/i,
                // Loading through an array, not an object. (Depends on the plugin)
                use: [
                    MiniCssExtractPlugin.loader,
                    // to load css
                    'css-loader',
                    // to load a css preprocessor
                    'stylus-loader',
                ],
            },
            {
                // loading images
                test: /\.png/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/images/[name][ext][query]',
                },
            },
            {
                // loading fonts
                test: /\.(woff2|woff)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/fonts/[name][ext][query]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src', 'assets/images'),
        //             to: 'assets/images',
        //         },
        //     ],
        // }),
        new Dotenv(),
        new BundleAnalyzerPlugin(),
    ],
}
