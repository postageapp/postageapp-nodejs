// == Imports ===============================================================

const path = require('path');

const helpers = require('../helpers');

const Config = require('../../lib/config');

// == Tests =================================================================

describe('Config', () => {
  it('can be defined via the environment', () => {
    var config = new Config();

    assert.ok(config.apiKey);
  });

  it('can be initialized with an API key', () => {
    var config = new Config('zQwEiD38s9iQOYtmTuu5yEVtEeK67dzZ');

    assert.equal(config.apiKey, 'zQwEiD38s9iQOYtmTuu5yEVtEeK67dzZ');
  });

  it('can be initialized via a file path', () => {
    var configPath = path.resolve(__dirname, '../config/example.json');

    var config = new Config(configPath);

    assert.equal(config.apiKey, '__EXAMPLE_API_KEY__');
  });
});
