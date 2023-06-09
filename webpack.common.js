/**
 * Global Imports
*/

require('dotenv').config();

const path = require('path');
const { DefinePlugin } = require('webpack');

/**
 * Load Environment Variables
*/

const env = {};

for (const key of require('./env.config.js').variables) {
    env['process.env.' + key] = JSON.stringify(process.env[key]);
}

/**
 * Exports
*/

module.exports = {
    entry: [
        './app/main.ts',
        './resources/sass/style.scss',
    ],

    plugins: [
        new DefinePlugin(env),
    ],

    output: {
        filename: 'bundle.[contenthash].js',
        chunkFilename: '[id].[contenthash].js',
        path:    path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },

    resolve: {
        extensions: [
            '.js',
            '.ts',
        ],

        alias: {
            '~': path.resolve(__dirname, 'app'),
            '@config': path.resolve(__dirname, 'config'),
            '@system': path.resolve(__dirname, 'system'),
        },

        fallback: {
            'querystring': false,
        },
    },
};
