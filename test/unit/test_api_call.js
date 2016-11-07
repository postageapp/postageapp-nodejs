// == Imports ===============================================================

const helpers = require('../helpers');

const PostageApp = require('../../lib/postageapp');
const ApiCall = require('../../lib/api_call');

// == Tests =================================================================

describe('ApiCall', () => {
  var postageApp = new PostageApp(helpers.configPath);

  it('should have simple defaults', () => {
    var call = new ApiCall();

    assert.equal(call.apiKey, undefined);
    assert.equal(call.method, undefined);
    assert.deepEqual(call.arguments, { });
  });

  it('is properly serialized', () => {
    var call = new ApiCall();

    call.apiKey = 'TEST_KEY';
    call.uid = 'ba03ebbc-b45f-4b11-8d11-c92822ab84f4';
    call.method = 'test';
    call.arguments = { test: true };

    var expected = JSON.stringify({
      api_key: 'TEST_KEY',
      uid: 'ba03ebbc-b45f-4b11-8d11-c92822ab84f4',
      method: 'test',
      arguments: { test: true }
    });

    assert.equal(call.serialize(), expected);
  });

  it('supports method and argument constructor options', () => {
    var call = new ApiCall(
      'send_message',
      {
        recipients: 'test@postageapp.com'
      },
      null,
      postageApp.config().apiKey
    );

    assert.equal(call.apiKey, postageApp.config().apiKey);
    assert.equal(call.method, 'send_message');
    assert.deepEqual(call.arguments, {
      recipients: 'test@postageapp.com'
    });
  });
});
