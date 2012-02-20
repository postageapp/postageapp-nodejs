var http = require('http');

var postageVersion = '1.0.0';

module.exports = function(apiKey) {
    return {
        sendMessage: function (options, callback) {
            var api = http.createClient(80, 'api.postageapp.com');

            var request = api.request('POST', '/v.1.0/send_message.json',
                {
                    'host': 'api.postageapp.com',
                    'content-type': 'application/json',
                    'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.JS ' + process.version + ')'
                });

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
            var date = new Date;
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

            request.on('response', function (response) {
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    callback(null, chunk);
                });
            });
            request.end(JSON.stringify(payload));
        },

        accountInfo: function () {
            var api = http.createClient(80, 'api.postageapp.com');

            var request = api.request('POST', '/v.1.0/get_account_info.json',
                {
                    'host': 'api.postageapp.com',
                    'content-type': 'application/json',
                    'user-agent': 'PostageApp Node.JS ' + postageVersion + ' (Node.JS ' + process.version + ')'
                });

            var payload = {
                api_key: apiKey
            };

            request.on('response', function (response) {
                console.log('STATUS: ' + response.statusCode);
                response.setEncoding('utf8');
                response.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
            });
            request.end(JSON.stringify(payload));
        }
    }
};
