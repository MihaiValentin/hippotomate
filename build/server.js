/**
 * Build the javascript for the front-end
 */
'use strict';

const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.development.js');

exports.start = function(verbose) {
    return new Promise((resolve, reject) => {
        const app = express();
        const compiler = webpack(config, (err, stats) => {
            if (stats.compilation.errors && stats.compilation.errors.length) {
                reject(app, server);
            } else {
                resolve(app, server);
            }
        });

        const PORT = 3000;

        app.use(require('webpack-dev-middleware')(compiler, {
            publicPath: config.output.publicPath,
            quiet: !verbose,
            stats: {
                colors: true
            }
        }));

        app.use(require('webpack-hot-middleware')(compiler));

        var server = app.listen(PORT, 'localhost', err => {
            if (err) {
                console.log(err);
                reject(app, server);
                return;
            }

            console.log(`Listening at http://localhost:${PORT}`);
        });
    })
};
