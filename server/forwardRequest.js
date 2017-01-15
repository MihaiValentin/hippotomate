/**
 * Forward the request received from the test to the destination server
 * Also, notify the front-end (via ipc) so it can log the request
 */

var http = require('http');

const {settings} = require('./settings');
const ipcClient = require('./ipcClient');

function forwardOpts(req) {
    var ret = {
        host: settings.getServerHostname(),
        port: settings.getServerPort(),
        method: req.method,
        path: req.url,
        headers: req.headers,
        agent: req.agent
    };
    return ret;
}

function getUid() {
    return ""
        + Math.round(new Date().getTime() + Math.random() * Math.pow(10,20));
}

function forwardRequest(req, data, res, afterWriteFn) {
    return new Promise(function(resolve, reject) {
        var uid = getUid();
        var client = http.request(forwardOpts(req), function(response) {
            var buf = "";
            response.on('data', function(dt) {
                buf += dt.toString();
            });
            response.on('end', function() {
                res.write(buf);
                res.end();
                resolve({
                    uid: uid,
                    responseCode: response.statusCode,
                    responseHeaders: response.headers,
                    responseData: JSON.parse(buf)
                });
            });
            response.on('error', function(err) {
                reject({
                    uid: uid,
                    responseCode: response.statusCode,
                    responseHeaders: response.headers,
                    responseData: JSON.parse(buf),
                    failed: true,
                    err: err
                });
            });
        });
        client.write(JSON.stringify(data));
        client.end();
        afterWriteFn(uid, req, data);
    });
}

function forward(req, reqData, res) {
    forwardRequest(req, reqData, res, function(uid, req, data) {
        ipcClient.send('request', {
            uid: uid,
            reqMethod: req.method,
            reqUrl: req.url,
            reqHeaders: req.headers,
            reqData: data
        });
    }).then(
        function(obj) {
            ipcClient.send('response', obj);
        },
        function(obj) {
            ipcClient.send('response', obj);
        }
    );
};

exports.forwardRequest = forwardRequest;
exports.forward = forward;