/**
 * We keep the breakpoints at the backend level, and keep references
 * to the requests and responses so the flow can be paused/continued on demand
 */

var breakpoints = {};

function exists(sessionId) {
    return breakpoints.hasOwnProperty(sessionId);
}

function add(sessionId, req, reqData, res) {
    breakpoints[sessionId] = {
        req: req,
        reqData: reqData,
        res: res
    };
}

function breakNext(sessionId) {
    if (!exists(sessionId)) {
        throw new Error("Breakpoint does not exist for sessionId: " + sessionId);
    }
    breakpoints[sessionId].breakNext = true;
    return breakpoints[sessionId];
}

function isBreakNext(sessionId) {
    if (!exists(sessionId)) {
        return false;
    }
    return breakpoints[sessionId].breakNext;
}

function remove(sessionId) {
    if (!exists(sessionId)) {
        throw new Error("Breakpoint does not exist for sessionId: " + sessionId);
    }
    var tmp = breakpoints[sessionId];
    delete breakpoints[sessionId];
    return tmp;
}

function getReq(sessionId) {
    if (!exists(sessionId)) {
        throw new Error("Breakpoint does not exist for sessionId: " + sessionId);
    }
    return breakpoints[sessionId].req;
}

exports.add = add;
exports.remove = remove;
exports.breakNext = breakNext;
exports.isBreakNext = isBreakNext;
exports.getReq = getReq;
