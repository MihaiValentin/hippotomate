/**
 * Analyze a given request, and facilitate the decision whether the request
 * has to be suspended (for debugging/breakpoint purposes)
 */

var analyzeIncomingRequest = function(req, shouldSuspendFn) {
    return new Promise(function(resolve, reject) {
        var data = null; // should be null, so it can be easily encoded to JSON
        req.on('data', function(buf) {
            // on first data receive, convert it to string so we can append data
            if (data === null) {
                data = "";
            }
            data += buf.toString();
        });
        req.on('end', function() {
            data = JSON.parse(data);
            var suspend = shouldSuspendFn(req, data);
            resolve({forward: !suspend, data: data});
        });
        req.on('error', function(err) {
            reject(err);
        });
    });
};

exports.analyzeIncomingRequest = analyzeIncomingRequest;