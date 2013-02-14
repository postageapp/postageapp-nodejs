var assert = require("assert"),
    settings = require('./settings.json'),
    postageapp = require('../lib/postageapp')(settings.apikey);

describe('postageapp', function () {
    describe('version', function() {
        it('should return a version string', function() {
            assert.equal('string', typeof(postageapp.version()));
        });
    });

    describe('sendMessage', function () {
        it('should get a successful response back from the server', function (done) {
            postageapp.sendMessage({
                content: "hello world",
                recipients: 'test@null.postageapp.com'
            }, function(throwaway, r) {
                var r = JSON.parse(r);
                assert.equal('ok', r.response.status);
                done();
            });
        });
    });
});
