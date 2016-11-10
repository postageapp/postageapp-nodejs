// == Imports ===============================================================

const http = require('http');
const https = require('https');

const ApiCall = require('./api_call');

const Config = require('./config');
const toCamelCase = require('./support').toCamelCase;

// == Constants =============================================================

const methods = [
  'get_method_list',
  'get_message_receipt',
  'send_message',
  'get_metrics',
  'get_suppression_list',
  'get_message_transmissions',
  'get_account_info',
  'messages_history',
  'get_project_info',
  'test_error'
];

// == Exported Classes ======================================================

class PostageApp {
  constructor(config) {
    this._config = new Config(config);

    this.version = require('../package.json').version;
  }

  config() {
    return this._config;
  }

  call(method, args, uid) {
    return new ApiCall(method, args, uid, this._config.apiKey);
  }

  test() {
    return this.send(this.call('get_project_info'));
  }

  send(call) {
    return new Promise((resolve, reject) => {
      var payload = call.serialize();
      var handler = this._config.secure ? https : http;

      var options = {
        host: this._config.host,
        port: this._config.port,
        method: 'POST',
        path: `/v.1.0/${call.method}.json`,
        headers: {
          host: this._config.host,
          'content-type': 'application/json',
          'user-agent': 'PostageApp Node.js ' + this.version + ' (Node.js ' + process.version + ')',
          'content-length': Buffer.byteLength(payload, 'utf8')
        }
      };

      var request = handler.request(options, function(response) {
        var buffer = '';

        response.on('data', (data) => {
          buffer += data;
        });

        response.on('end', () => {
          var reply = JSON.parse(buffer);

          switch (response.statusCode) {
            case 200:
              resolve(reply.data);
              break;
            default:
              reject(reply.response);
              break;
          }
        });

        response.on('error', (err) => {
          reject(err);
        });
      });

      request.on('error', (err) => {
        reject(err);
      });

      request.end(payload, 'utf8');
    });
  }
};

// Dynamically generates methods to handle all of the API endpoints.
methods.forEach((methodName) => {
  var variants = [ methodName ];

  variants.push(toCamelCase(methodName));

  // Also aliases things like `get_a_thing` to `aThing` for convenience.
  if (methodName.match(/^get_/)) {
    var sansGet = methodName.replace(/^get_/, '');

    variants.push(sansGet);
    variants.push(toCamelCase(sansGet));
  }

  var proc = function(args, uid) {
    return this.send(this.call(methodName, args, uid));
  };

  variants.forEach((name) => {
    PostageApp.prototype[name] = proc;
  });
})

// == Exports ===============================================================

module.exports = PostageApp;
