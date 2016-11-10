// == Imports ================================================================

const fs = require('fs');
const path = require('path');

// == Local Variables ========================================================

const defaults = {
  host: 'api.postageapp.com',
  port: 443,
  secure: true,
  apiKey: undefined,
  spool: undefined
};

// == Initialization ========================================================

if (process.env.POSTAGEAPP_HOST) {
  defaults.host = process.env.POSTAGEAPP_HOST;
}

if (process.env.POSTAGEAPP_PORT) {
  defaults.port = process.env.POSTAGEAPP_PORT;
}

if (process.env.POSTAGEAPP_SECURE) {
  defaults.secure = !!process.env.POSTAGEAPP_SECURE;
}

if (process.env.POSTAGEAPP_SPOOL) {
  defaults.spool = !!process.env.POSTAGEAPP_SPOOL;
}

if (process.env.POSTAGEAPP_API_KEY) {
  defaults.apiKey = process.env.POSTAGEAPP_API_KEY;
}

// == Exported Class ========================================================

class Config {
  constructor(options) {
    if (!options) {
      options = process.env.POSTAGEAPP_CONFIG;
    }

    this.merge(defaults);

    switch (typeof(options)) {
      case 'string':
        var configPath = path.resolve(process.cwd(), options);

        if (fs.existsSync(configPath)) {
          this.merge(require(configPath));
        }
        else if (options.match(/^\w+$/)) {
          this.apiKey = options;
        }
        
        break;
      case 'object':
        this.merge(options);
        break;
      case 'undefined':
        // Work with defaults.
        break;
    }
  }

  merge(options) {
    Object.keys(options).forEach((k) => {
      this[k] = options[k];
    });
  }
}

// == Exports ===============================================================

module.exports = Config;
