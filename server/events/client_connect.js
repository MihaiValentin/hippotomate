/**
 * Client requests a connection to a test automation server
 * This event performs the connection and reports back success or failure
 */

const connect = require('../connect');
const ipcClient = require('../ipcClient');
const {settings} = require('../settings');
const server = require('../../proxy');

module.exports = {
    event: "CLIENT_CONNECT",
    action: function(ev, payload) {
        settings.setAppPort(payload.appPort);
        settings.setServerHostname(payload.serverHostname);
        settings.setServerPort(payload.serverPort);

        /*
         try to connect to the server first and get a status. then,
         if all good, try to listen on the given port.
         */
        connect.getConnectServerStatus(settings.getServerHostname(),
            settings.getServerPort(), settings.getServerPath())
            .then(() => connect.attemptListen(server.getServer(),
                settings.getAppPort()))
            .then(() => {
                ipcClient.send('SERVER_CONNECT', {
                    data: settings.getSettings()
                });
            })
            .catch((err) => {
                console.log('errorrs');
                console.log(err);
                ipcClient.send('SERVER_CONNECT', {
                    errors: [err]
                });
            });
    }
};