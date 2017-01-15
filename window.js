const electron = require('electron');
const path = require('path');
const url = require('url');

require('electron-debug')({enabled: true, showDevTools: process.env.NODE_ENV === 'development'});

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

exports.start = function (mainWindow) {
    return new Promise(function (resolved, rejected) {
        function createWindow() {
            // Create the browser window.
            mainWindow = new BrowserWindow({width: 800, height: 600});

            mainWindow.setMenu(null);

            // and load the index.html of the app.
            mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'index.html'),
                protocol: 'file:',
                slashes: true
            }));

            mainWindow.webContents.on('did-finish-load', function () {
                /* this is the mainWindow.webContents, and we can use it anywhere where we need to interact
                with other parts (main or renderer) */
                resolved(this);
            });

            mainWindow.webContents.on('did-fail-load', function () {
                rejected();
            });

            // Emitted when the window is closed.
            mainWindow.on('closed', function () {
                // Dereference the window object, usually you would store windows
                // in an array if your app supports multi windows, this is the time
                // when you should delete the corresponding element.
                mainWindow = null;
            });
        }

        // This method will be called when Electron has finished initialization and is ready to create browser windows.
        app.on('ready', createWindow);

        // Quit when all windows are closed.
        app.on('window-all-closed', function () {
            // On OS X it is common for applications and their menu bar
            // to stay active until the user quits explicitly with Cmd + Q
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', function () {
            // On OS X it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) {
                createWindow();
            }
        });
    });
};