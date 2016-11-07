var http = require('http');
var crypto = require('crypto');

var postageVersion = require('../package.json').version;

module.exports = function(apiKey) {
  return {
    version: function() {
      return postageVersion;
    },

    getApiKey: function() {
      return apiKey;
    },

    setApiKey: function(newKey) {
      apiKey = newKey;
    },

    sendMessage: function (options, success, error) {
      var recipients = options.recipients;
      var recipientOverride = options.recipient_override;

      var subject = options.subject;
      var from = options.from;

      var attachments = options.attachments ? options.attachments : {};
      var content = options.content;

      var template = options.template;
      var variables = options.variables;

      // no-op callback defaults
      if (typeof(success) !== 'function') success = function() {};
      if (typeof(error) !== 'function') error = function() {};

      /*
       Creates a string of numbers to be used for the UID, which has to be a unique identifier in order
       to prevent duplicate sending through PostageApp.
       */
      var str = JSON.stringify(options);
      var hash = crypto.createHash('sha1').update(str).digest('hex');

      /*
       Payload is the aggregated data that will be passed to the API server including all of the parameters
       required to send an email through PostageApp.
       */
      var payload = {
        api_key: apiKey,
        uid: hash,
        arguments: {
          recipients: recipients,
          recipient_override: recipientOverride,
          headers: {
            subject: subject,
            from: from
          },
          content: content,
          attachments: attachments,
          template: template,
          variables: variables
        }
      };

      payload = JSON.stringify(payload);

      var request = http.request({
        'port': 80,
        'host': 'api.postageapp.com',
        'method': 'POST',
        'path': '/v.1.0/send_message.json',
        'headers': {
          'host': 'api.postageapp.com',
          'content-type': 'application/json; charset=utf8',
          'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.js ' + process.version + ')',
          'content-length': Buffer.byteLength(payload, 'utf8')
        }
      });

      request.on('response', function (response) {
        response.setEncoding('utf8');

        var json;
        response.on('data', function (data) {
          if (response.headers['content-type'].indexOf("application/json") === 0) {
            json = JSON.parse(data);
          }
          else {
            json = {
              response: {
                status: "fail",
                message: "Received an unexpected non-json response"
              }
            }
          }

          if (response.statusCode >= 400 && response.statusCode <= 600) {
            error(json.response.message, json);
          }
          else {
            success(response, json);
          }
        });
      });

      request.on('error', function (err) {
        error(err, { });
      });

      request.end(payload, 'utf8');
    },

    accountInfo: function () {
      var payload = {
        api_key: apiKey
      };

      payload = JSON.stringify(payload);

      var request = http.request({
        'port': 80,
        'host': 'api.postageapp.com',
        'method': 'POST',
        'path': '/v.1.0/get_account_info.json',
        'headers': {
          'host': 'api.postageapp.com',
          'content-type': 'application/json',
          'user-agent': 'PostageApp Node.js ' + postageVersion + ' (Node.js ' + process.version + ')',
          'content-length': Buffer.byteLength(payload, 'utf8')
        }
      });

      request.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      });

      request.end(payload);
    },

    messageStatus: function (options) {
      var desiredUID = options.desiredUID;

      var payload = {
        api_key: apiKey,
        uid: desiredUID,
      };

      payload = JSON.stringify(payload);

      var request = http.request({
        'port': 80,
        'host': 'api.postageapp.com',
        'method': 'POST',
        'path': '/v.1.0/message_status.json',
        'headers': {
          'host': 'api.postageapp.com',
          'content-type': 'application/json',
          'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.js ' + process.version + ')',
          'content-length': Buffer.byteLength(payload, 'utf8')
        }
      });

      request.on('response', function (response) {
        console.log('STATUS: ' + response.statusCode);
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
          console.log('BODY: ' + chunk);
        });
      });

      request.end(payload);
    }
  }
};
