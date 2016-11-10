// == Imports ===============================================================

const Promise = require('bluebird').Promise;
const uuid = require('uuid');

// == Exported Class ========================================================

class ApiCall {
  constructor(method, args, uid, apiKey) {
    this.apiKey = apiKey;
    this.uid = uid || uuid.v4();
    this.method = method;
    this.arguments = args || { };
  }

  // Override the toJSON() method to output the JSON with underscored names,
  // not mixedCase like inside JavaScript.
  toJSON() {
    return {
      api_key: this.apiKey,
      uid: this.uid,
      method: this.method,
      arguments: this.arguments
    };
  }

  serialize(pretty) {
    if (pretty) {
      return JSON.stringify(this, null, 2);
    }

    return JSON.stringify(this);
  }
}

// == Exports ===============================================================

module.exports = ApiCall;
