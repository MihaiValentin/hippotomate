/* eslint strict: 0 */
'use strict';

const path = require('path');

module.exports = {
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
            presets: ['react', 'es2015']
        }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
        test: /\.css$/,
        loader: 'style-loader'
    }, {
        test: /\.less$/,
        loader: "style!css!less"
    }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=100000&mimetype=application/font-woff"
    },
        { // just don't load. chrome doesn't need these
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "null-loader"
        }]
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd'
  },
    resolveLoader: {
        alias: {
            "null-loader": path.join(__dirname, "./null-loader")
        }
    },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
    // put your node 3rd party libraries which can't be built with webpack here
    // (mysql, mongodb, and so on..)
  ]
};
