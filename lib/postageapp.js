var http = require('http');

var postageVersion = '1.1.1';

module.exports = function(apiKey) {
    return {
        version: function() { return postageVersion; },

        sendMessage: function (options, callback) {
            var recipients = options.recipients;

            var subject = options.subject;
            var from = options.from;

            var attachments = options.attachments ? options.attachments : {};
            var content = options.content;

            var template = options.template;
            var variables = options.variables;

            /*
             Creates a string of numbers to be used for the UID, which has to be a unique identifier in order
             to prevent duplicate sending through PostageApp.
             */
            var date = new Date();
            var epochDate = date.getTime();

            /*
             Payload is the aggregated data that will be passed to the API server including all of the parameters
             required to send an email through PostageApp.
             */
            var payload = {
                api_key: apiKey,
                uid: epochDate,
                arguments: {
                    recipients: recipients,
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
                    'content-type': 'application/json',
                    'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.JS ' + process.version + ')',
                    'content-length': payload.length
                }
            });

            request.on('response', function (response) {
                response.setEncoding('utf8');
                if (typeof callback !== 'undefined') {
                    response.on('data', function (chunk) {
                        callback(null, chunk);
                    });
                }
            });
            request.end(payload);
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
                    'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.JS ' + process.version + ')',
                    'content-length': payload.length
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
                    'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.JS ' + process.version + ')',
                    'content-length': payload.length
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
