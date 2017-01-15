var selenium = require('selenium-standalone');
var spawn = require('child_process').spawn;
var Application = require('spectron').Application;
var assert = require('assert');
var webdriverio = require('webdriverio');
var os = require('os');
var which = require('which');
var mlog = require('mocha-logger');
var {start} = require('../../build/server');

var seleniumChildProcess,
    hotServerExpressApp,
    hotServerExpressServer,
    app;

function seleniumInstall(version) {
    return new Promise((resolve, reject) => {
        selenium.install({
            drivers: {},
            version: version,
            baseURL: 'https://selenium-release.storage.googleapis.com'
        }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

function seleniumStart(version, port) {
    return new Promise((resolve, reject) => {
        selenium.start({
            drivers: {},
            version: version,
            seleniumArgs: ['-port', port],
            javaArgs: ['-Dphantomjs.binary.path=node_modules/.bin/phantomjs' + (/^win/.test(os.platform()) ? ".cmd" : "")]
        }, (err, child) => {
            if (err) {
                reject(err, child);
            } else {
                // child.stdout.on('data', (data) => {
                //     mlog.log(data.toString());
                // })
                // child.stderr.on('data', (data) => {
                //     mlog.log(data.toString());
                // })
                resolve(child);
            }
        });
    });
}

function runHotServer() {
    return new Promise((resolve, reject) => {
        start().then(resolve).catch(reject);
    });
}

function connectToSelenium(port) {
    return new Promise((resolve, reject) => {
        app.client.windowByIndex(1) // select electron main window, and not dev tools which is opened by default
        .then(() => {
            return app.client.elements('[data-test-id="accept-license-button"]');
        }).then((licenseButtons) => {
            if (licenseButtons.value.length === 1) {
                return app.client.click('[data-test-id="accept-license-button"] button')
            }
        }).then(() => {
            return app.client.waitForExist('.intro-field-port');
        }).then(() => {
            return app.client.setValue('.intro-field-port', port);
        }).then(() => {
            return app.client.click('[data-test-id="intro-button-go"]');
        }).then(() => {
            return app.client.waitUntilTextExists('.empty-container > h1', 'Hippotomate is ready!');
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    });
}

function startTesting() {
    var options = {
        host: '127.0.0.1',
        port: 9020,
        desiredCapabilities: {
            browserName: 'phantomjs'
        }
    };

    return new Promise((resolve, reject) => {
        webdriverio
            .remote(options)
            .init()
            .url('http://www.google.com')
            .getTitle().then(function(title) {
                mlog.log('Title was: ' + title);
            })
            .end().then(() => {
            resolve();
        }).catch(() => {
            reject();
        });
    });
}

function checkTest() {
    return new Promise((resolve, reject) => {
        app.client.$$('.session-container').then((sessions) => {
            assert.equal(sessions.length, 1);
            resolve();
        }).catch((err) => {
            reject(err)}
        );
    });
}

describe('e2e test suite', function() {
    this.slow(10000);

    before(function() {
        this.timeout(30000);
        mlog.log('Installing Selenium ...');
        return seleniumInstall('3.0.0').then(() => {
            mlog.log('Starting Selenium ...');
            return seleniumStart('3.0.0', 4445);
        }).then((child) => {
            mlog.log('Starting hot-server ...');
            seleniumChildProcess = child;
            return runHotServer();
        }).then((expressApp, expressServer) => {
            mlog.log('Starting electron app ...');
            hotServerExpressApp = expressApp;
            hotServerExpressServer = expressServer;

            app = new Application({
                env: { HOT : 1, NODE_ENV : 'development' },
                path: which.sync('node'),
                args: ['node_modules/electron/cli.js', 'main.js']
            });

            return app.start();
        }).then(() => {
            mlog.log('Connecting to running Selenium ...');
            return connectToSelenium(4445);
        });
    })

    it('should run a single Selenium test and ensure the app\'s UI is correctly updated', function() {
        this.timeout(10000);
        mlog.log('Running a sample test ...');
        return startTesting().then(() => {
            mlog.log('Checking if the test is represented correctly in the app ...');
            return checkTest();
        })
    })
    
    after(() => {
        seleniumChildProcess && seleniumChildProcess.kill();
        hotServerExpressServer && hotServerExpressServer.close();
        app && app.stop();
    })
})