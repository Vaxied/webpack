/** @type {import('webpack').Configuration} */

// Importing the mode path from node
const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    resolve: {
        extensions: ['.js'],
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
        ],
    },
}
