/**
 * When the user hits next during debugging, set a breakpoint on that session
 * and continue with forwarding requests
 */

const breakpoints = require('../breakpoints');
const ipcClient = require('../ipcClient');
const {forward} = require('../forwardRequest');

module.exports = {
    event: "DEBUG_NEXT",
    action: function(ev, payload) {
        var breakpoint = breakpoints.breakNext(payload.sessionId);
        forward(breakpoint.req, breakpoint.reqData, breakpoint.res);
    }
};