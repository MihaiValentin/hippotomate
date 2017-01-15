var {extractSessionId} = require('../../common/extractSessionId');
var assert = require('assert');

describe('utility function that gets session id from the url', () => {
    it('should return return the session from a correct url', () => {
        assert.equal('123456abcdef', extractSessionId('my-url/session/123456abcdef/'))
        assert.equal('123-456-abcdef', extractSessionId('my-url/session/123-456-abcdef/'))
        assert.equal('123-456-abcdef', extractSessionId('my-url/session/123-456-abcdef/segment'))
        assert.equal('123-456-abcdef', extractSessionId('my-url/session/123-456-abcdef'))
        assert.equal('123-456-abcdef', extractSessionId('my-url/session/123-456-abcdef/other/abcd-efgh'))
    })
    it('should return null in case of incorrect/inexistent session in an url', () => {
        assert.equal(null, extractSessionId('my-url/session/zxypghi/'))
    })
})