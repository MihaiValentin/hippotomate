/**
 * Set-up phase; connecting to the test automation server and attempting to
 * listen on the given port to receive connections
 */

var http = require('http');

function getConnectServerStatus(host, port, path) {
    return new Promise((resolve, reject) => {

        var errorFn = function (err) {
            reject({
                type: 'TARGET_CONNECT_ERROR',
                message: err.message,
                code: err.code
            });
        };

        var statusRequest = http.get({
            host: host,
            port: port,
            path: path + '/status'
        }, (response) => {
            var buf = "";
            response.on('data', function(dt) {
                buf += dt.toString();
            });
            response.on('end', function() {
                try {
                    buf = JSON.parse(buf);
                    // selenium nodes return state = success,
                    // selenium grid returns status = 13
                    if (buf.state === 'success' || buf.status === 13) {
                        resolve();
                    }
                } catch(e) {}
                errorFn({
                    code: "HPTM_INCORRECT_RESPONSE",
                    message: "Incorrect response received, this is not a " +
                        "test automation server"
                });
            });
            response.on('error', errorFn);
        });
        statusRequest.on('error', errorFn);

        statusRequest.on('timeout', () => errorFn({
            code: "HTPM_CONNECT_TIMEOUT",
            message: "Timeout while trying to connect to the " +
                "test automation server"
        }));
        statusRequest.setTimeout(10000);
    });
}

function attemptListen(server, port) {
    return new Promise((resolve, reject) => {
        server.once('error', function(err) {
            server.close();
            reject({
                type: 'LISTEN_ERROR',
                message: err.message,
                code: err.code
            })
        });
        server.once('listening', function() {
            resolve();
        });

        // TODO to listen to global interface, maybe add a flag
        // Listening on localhost by default
        server.listen(port, '127.0.0.1');
    });
}

exports.attemptListen = attemptListen;
exports.getConnectServerStatus = getConnectServerStatus;