let {extractSessionId} = require('../../common/extractSessionId');

/**
 * Given an object with {responseData and reqUrl}, try to extract session id
 * @param p
 * @returns {*}
 */
export default function extractSessionId(p) {
    if (p.responseData && p.responseData.sessionId) {
        return p.responseData.sessionId;
    } else if (p.reqUrl) {
        return extractSessionId(p.reqUrl);
    }
    return null;
}