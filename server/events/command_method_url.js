/**
 * Run a command during debugging
 */

var http = require('http');
const {settings} = require('../settings');
const breakpoints = require('../breakpoints');
const ipcClient = require('../ipcClient');
//const CommandsList = require('../../common/protocol/CommandsList');

function getUid() {
    return ""
        + Math.round(new Date().getTime() + Math.random() * Math.pow(10,20));
}

module.exports = {
    event: "COMMAND_METHOD_URL",
    action: function (ev, payload) {
        let {sessionId, method, url, urlParams, data, uiUID} = payload;
        url = url.replace(':sessionId', sessionId);

        var req = breakpoints.getReq(payload.sessionId);
        var uid = getUid();
        var xshotCli = http.request({
            host: settings.getServerHostname(),
            port: settings.getServerPort(),
            method: method,
            path: '/wd/hub' + url,
            agent: req.agent
        }, function (response) {
            var buf = "";
            response.on('data', function (dt) {
                buf += dt.toString();
            });
            response.on('end', function () {
                ipcClient.send('response', {
                    uid: uid,
                    responseCode: response.statusCode,
                    sessionId: sessionId,
                    headers: response.headers,
                    responseData: JSON.parse(buf)
                });
                ipcClient.send('COMMAND_EXECUTED', {
                    sessionId: sessionId
                });
                ipcClient.send('COMMAND_METHOD_URL_FINISHED_UIUID_' + uiUID, {
                    uid: uid,
                    responseCode: response.statusCode,
                    sessionId: sessionId,
                    headers: response.headers,
                    responseData: JSON.parse(buf)
                });
            });
            response.on('error', function (err) {
                ipcClient.send('response', {
                    uid: uid,
                    responseCode: response.statusCode,
                    sessionId: sessionId,
                    headers: response.headers,
                    responseData: JSON.parse(buf),
                    failed: true
                });
            });
        });
        if (data) {
            // TODO fix this
            if (data.hasOwnProperty("args")) {
                data.args = [];
            }
            console.log(data);
            xshotCli.write(JSON.stringify(data));
        }
        xshotCli.end();
        ipcClient.send('request', {
            uid: uid,
            sessionId: sessionId,
            reqMethod: method,
            reqUrl: '/wd/hub' + url,
            reqData: data,
            intercept: true
        });
    }
};