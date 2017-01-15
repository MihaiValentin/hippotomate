var http = require('http');
const {settings} = require('../settings');
const breakpoints = require('../breakpoints');
const ipcClient = require('../ipcClient');

function getUid() {
    return "" + Math.round(new Date().getTime() + Math.random() * Math.pow(10,20));
}

module.exports = {
    event: "COMMAND",
    action: function (ev, payload) {
        if (payload.command == 'screenshot') {
            var req = breakpoints.getReq(payload.sessionId);
            var uid = getUid();
            var sessionId = payload.sessionId;
            var xshotCli = http.request({
                host: settings.getServerHostname(),
                port: settings.getServerPort(),
                method: 'GET',
                path: '/wd/hub/session/' + sessionId + '/screenshot',
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
                        headers: response.headers,
                        responseData: JSON.parse(buf)
                    });
                });
                response.on('error', function (err) {
                    ipcClient.send('response', {
                        uid: uid,
                        responseCode: response.statusCode,
                        headers: response.headers,
                        responseData: JSON.parse(buf),
                        failed: true
                    });
                });
            });
            xshotCli.end();
            ipcClient.send('request', {
                uid: uid,
                reqMethod: 'GET',
                reqUrl: '/wd/hub/session/' + sessionId + '/screenshot',
                reqData: null,
                intercept: true,
                hide: true
            });
        }
    }
};