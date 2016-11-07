// == Imports ===============================================================

const fs = require('fs');
const path = require('path');

// == Globals ===============================================================

global.assert = require('chai').assert;

// == Local Variables =======================================================

var configPath = path.resolve(__dirname, 'config/test.json');

// == Environment Overrides =================================================

if (process.env.POSTAGEAPP_CONFIG) {
  configPath = path.resolve(process.cwd(), process.env.POSTAGEAPP_CONFIG);
}
else if (fs.existsSync(configPath)) {
  process.env.POSTAGEAPP_CONFIG = configPath;
}
else if (!process.env.POSTAGEAPP_API_KEY) {
  process.env.POSTAGEAPP_API_KEY = '__DEFAULT_API_KEY__';
}

// == Exports ===============================================================

module.exports = {
  configPath: configPath,
  assert: global.assert
};
