// == Imports ===============================================================

const helpers = require('./helpers');

// == Tests =================================================================

// describe('postageapp', function () {
//   var postageapp = require('../lib/postageapp')(apiKey);

//   this.timeout(5000);

//   describe('version', function() {
//     it('should return a version string', function() {
//       assert.equal('string', typeof(postageapp.version()));
//     });
//   });

//   describe('sendMessage', function () {
//     it('should get a successful response back from the server', function (done) {
//       postageapp.sendMessage({
//         content: "hello world",
//         recipients: 'test@null.postageapp.com'
//       }, function(throwaway, r) {
//         assert.equal('ok', r.response.status);
//         done();
//       });
//     });

//     it('should invoke the error callback for a bogus request', function(done) {
//       postageapp.sendMessage({}, function() {}, function(err, r) {
//         assert.equal('precondition_failed', r.response.status);
//         done();
//       });
//     });

//     it('should work with utf8-encoded content', function(done) {
//       postageapp.sendMessage({
//         content: "hello snowman ☃☃☃☃☃☃☃☃☃☃☃☃☃☃☃",
//         recipients: "test@null.postageapp.com"
//       }, function(throwaway, r) {
//         assert.equal('ok', r.response.status);
//         done();
//       }, function(err) {
//         console.log(err);
//         assert(false, 'should not have received an error')
//         done();
//       });
//     });

//     it('should support recipient override', function(done) {
//       postageapp.sendMessage({
//       content: 'recipient override test',
//       recipients: 'test@null.postageapp.com',
//       recipient_override: 'test2@null.postageapp.com'
//       }, function (throwaway, r) {
//       assert.equal('ok', r.response.status);
//       done();
//       }, function (err) {
//       console.log(err);
//       assert(false, 'should not have received an error');
//       done();
//       });
//     });
//   });
// });
