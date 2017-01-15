var {MaybeJSON} = require('../../../common/util/MaybeJSON');
var assert = require('assert');

describe('given string inside JSON, return JSON if possible, else return the initial string', () => {
    it('should return JSON from string', () => {
        assert.deepEqual({"a":5}, MaybeJSON('{"a":5}'))
    })
    it('should return the same string if not a JSON', () => {
        assert.deepEqual('{"a": 5"}', MaybeJSON('{"a": 5"}'))
        assert.equal('hello world', MaybeJSON('hello world'))
    })
})