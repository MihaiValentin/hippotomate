'use strict';

const electron = require('electron');
const {setIpc} = require('./server/ipcClient');

/*
=============
INITIALIZE UI
=============
*/
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const browserWindow = require('./window');
browserWindow.start(mainWindow).then(function(ipc) {
    setIpc(ipc);
    const server = require('./proxy');
    server.start();
});







