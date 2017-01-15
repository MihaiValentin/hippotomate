var connect = require('../../server/connect');
var assert = require('assert');
var nock = require('nock');
var http = require('http');

describe('first time connection to target testing server', () => {
    it('should be able to connect to target selenium node server', (done) => {
        nock('http://127.0.0.1:4447')
            .get('/wd/hub/status')
            .reply(200, '{"state": "success"}');

        connect.getConnectServerStatus("127.0.0.1", 4447, "/wd/hub").then(
            function() {
                assert.equal(true, true)
                done();
            },
            function(err) {
                assert.equal(true, false)
                done();
            }
        )
    })

    it('should be able to connect to target selenium grid server', (done) => {
        nock('http://127.0.0.1:4447')
            .get('/wd/hub/status')
            .reply(200, '{"status": 13}');

        connect.getConnectServerStatus("127.0.0.1", 4447, "/wd/hub").then(
            function() {
                assert.equal(true, true)
                done();
            },
            function(err) {
                assert.equal(true, false)
                done();
            }
        )
    })

    it('should be able to react to incorrect response http code', (done) => {
        nock('http://127.0.0.1:4447')
            .get('/wd/hub/status')
            .reply(404);

        connect.getConnectServerStatus("127.0.0.1", 4447, "/wd/hub").then(
            function() {
                assert.equal(true, false)
                done();
            },
            function(err) {
                assert.equal(typeof err === 'object', true)
                done();
            }
        )
    })

    it('should be able to react to incorrect response string', (done) => {
        nock('http://127.0.0.1:4447')
            .get('/wd/hub/status')
            .reply(200, '{"incorrect": "response"}');

        connect.getConnectServerStatus("127.0.0.1", 4447, "/wd/hub").then(
            function() {
                assert.equal(true, false)
                done();
            },
            function(err) {
                assert.equal(typeof err === 'object', true)
                done();
            }
        )
    })

    it('should be able to react in case of connection timeout', (done) => {
        nock('http://127.0.0.1:4447')
            .get('/wd/hub/status')
            .socketDelay(20000)
            .reply(200, '{"incorrect": "response"}');

        connect.getConnectServerStatus("127.0.0.1", 4447, "/wd/hub").then(
            function() {
                assert.equal(true, false)
                done();
            },
            function(err) {
                assert.equal(typeof err === 'object', true)
                done();
            }
        )
    })
})

describe('open local port so tests can connect to it', () => {
    it('should be able to open a local port', (done) => {
        var server = http.createServer();
        connect.attemptListen(server, 0).then(function() {
            assert.equal(true, true)
            server.close();
            done();
        }, function() {
            assert.equal(true, false)
            done();
        })
    })

    it('should be able to report an error when trying to open an occupied port', (done) => {
        // occupy a port
        var server = http.createServer()
        var server2 = http.createServer()
        var port;
        server.once('listening', function() {
            port = server.address().port

            connect.attemptListen(server2, port).then(function() {
                assert.equal(false, true);
                server2.close()
                server.close()
                done();
            }, function(err) {
                assert.equal(typeof err === 'object', true)
                server2.close()
                server.close()
                done();
            })
        })
        server.listen(0, '127.0.0.1')
    })
})