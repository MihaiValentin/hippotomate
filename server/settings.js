/**
 * Provides initial configuration for the app like to which Selenium server to
 * connect to and which port should it open to accept connections
 */

function SettingsClass() {
    var appPort = 9020,
        serverHostname = "127.0.0.1",
        serverPort = 4444,
        serverPath = '/wd/hub';

    this.setAppPort = function(x) { appPort = x; };
    this.setServerHostname = function(x) { serverHostname = x; };
    this.setServerPort = function(x) { serverPort = x; };
    this.setServerPath = function(x) { serverPath = x; };
    this.getAppPort = function() { return appPort; };
    this.getServerHostname = function() { return serverHostname; };
    this.getServerPort = function() { return serverPort; };
    this.getServerPath = function() { return serverPath; };


    this.getSettings = function() {
        return {
            appPort,
            serverHostname,
            serverPort,
            serverPath
        };
    }
}

exports.settings = new SettingsClass();
