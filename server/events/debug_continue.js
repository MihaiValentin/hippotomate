/**
 * Continue running; ends debugging by removing the breakpoint
 */

const breakpoints = require('../breakpoints');
const ipcClient = require('../ipcClient');
const {forward} = require('../forwardRequest');

module.exports = {
    event: "DEBUG_CONTINUE",
    action: function(ev, payload) {
        var breakpoint = breakpoints.remove(payload.sessionId);
        forward(breakpoint.req, breakpoint.reqData, breakpoint.res);
        ipcClient.send('continue', {
            sessionId: payload.sessionId
        });
    }
};