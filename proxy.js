/**
 * High-level management of all requests coming through the app
 * On any given request, analyze it and forward it to the app and the
 * test automation server.
 * There are also special requests that debug, however, this is all abstracted.
 */

var http = require('http');
var fs = require('fs');

const {settings} = require('./server/settings');
const {extractSessionId} = require('./common/extractSessionId');
const {analyzeIncomingRequest} = require('./server/analyzeIncomingRequest');
const {forward} = require('./server/forwardRequest');
const breakpoints = require('./server/breakpoints');
const ipcClient = require('./server/ipcClient');
const events = require('./server/events');

var addBreakpoint = function(req, reqData, res) {
    var sessionId = extractSessionId(req.url);
    breakpoints.add(sessionId, req, reqData, res);
    ipcClient.send('DEBUG_START', {
        sessionId: sessionId
    });
};

var server = http.createServer(function(req, res) {
    analyzeIncomingRequest(req, function(req, data) {
        var isDebugger = data && data.using === 'id' && data.value === '--debugger;';
        var sessionId = extractSessionId(req.url);
        var isBreakNext = false;
        if (sessionId) {
            isBreakNext = breakpoints.isBreakNext(sessionId);
        }
        var shouldSuspend = isDebugger || isBreakNext;
        return shouldSuspend;
    }).then(function(result) {
        if (result.forward) {
            forward(req, result.data, res);
        } else {
            addBreakpoint(req, result.data, res);
        }
    }, function(err) {
        console.log('Error analyzing incoming request', err);
    });
});

exports.start = function() {
    ipcClient.send('settings', settings.getSettings());
};

exports.getServer = function() { return server; };