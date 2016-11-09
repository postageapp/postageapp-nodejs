// == Imports ===============================================================

const helpers = require('../helpers');

const PostageApp = require('../../lib/postageapp');

// == Tests =================================================================

describe('PostageApp', () => {
  it('can initialize itself with defaults', () => {
    var postageApp = new PostageApp();

    assert.ok(postageApp);
    assert.ok(postageApp.config().apiKey);
  });

  describe('with the test configuration', () => {
    var postageApp = new PostageApp(helpers.configPath);

    it('has a defined API key', () => {
      assert.ok(postageApp.config().apiKey);
    });

    it('can send a test call', () => {
      return postageApp.test().then((result) => {
        assert.ok(result);

        assert.ok(result.project);
        assert.equal(result.project.name, 'Test');
      });
    });

    it('can send a test email', () => {
      return postageApp.sendMessage({
        recipients: 'test@null.postageapp.com',
        template: 'sample_child_template',
      }).then((response) => {
        assert.ok(response);
      });
    });

    it('can handle error responses', () => {
      return postageApp.testError().then((response) => {
        assert.fail();
      }).catch((response) => {
        switch (response.constructor.name) {
          case 'AssertionError':
            throw response;
        }

        assert.ok(response);
      });
    })
  });
});
