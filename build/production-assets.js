/**
 * Creates the production assets in the /target/ folder
 * These assets can then be attached to an Electron app
 */

const fs = require('fs-extra');
const path = require('path');
const del = require('del');
const webpack = require('webpack');

var cfg = require('./webpack.config.production.js');

console.log('Removing the target/ folder ...')
del('target').then(() => {
    cfg.output.path = path.join(__dirname, '../target/production');
    cfg.output.publicPath = '';
    delete cfg.devtool;

    console.log('Building client-side assets ...');
    webpack(cfg, (err, stats) => {
        if (err) {
            return console.error(err);
        }

        try {
            console.log('Copying static client-side assets to target folder ...');
            fs.copySync("index.html", "target/production/index.html");
            fs.copySync("package.json", "target/production/package.json");
            fs.copySync("app/product/img", "target/production/app/product/img");

            console.log('Building server-side assets ...');
            webpack({
                entry: [
                    './main'
                ],
                output: {
                    path: path.join(__dirname, '../target/production'),
                    filename: 'main.js',
                    libraryTarget: 'commonjs2'
                },
                externals: ['electron'],
                target: 'node',
                // consider __dirname and __filename global
                node: {
                    __dirname: false,
                    __filename: false
                }
            }, function(err, status) {
                if (err) {
                    return console.error(err);
                }

                console.log('All done, assets written to target/ folder!');
            });
        } catch(e) {
            console.log(e);
        }

    });
}).catch(err => {
    console.error(err);
});