// == Imports ===============================================================

const Promise = require('bluebird').Promise;
const uuid = require('uuid');

// == Exported Class ========================================================

class ApiCall {
  constructor(method, args, uid, apiKey) {
    this.method = method;
    this.uid = uid || uuid.v4();
    this.arguments = args || { };
    this.apiKey = apiKey;
  }

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
