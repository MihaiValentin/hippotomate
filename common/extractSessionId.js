function extractSessionId(url) {
    var m = url.match(/session\/([0-9A-Fa-f-]+)\/?/);
    if (m && m[1]) {
        return m[1];
    }
    return null;
}

exports.extractSessionId = extractSessionId;