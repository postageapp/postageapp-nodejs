var http = require('http');

var apiKey = 'API KEY HERE';

var postageapp = module.exports = {
	apiCall: function (emailRecipients, emailContent, emailSubject, emailFrom, emailVariables) {
		var api = http.createClient(80, 'api.postageapp.com');

		var request = api.request('POST', '/v.1.0/send_message.json', 
		{
			'host': 'api.postageapp.com',
		  	'content-type': 'application/json',
		  	'user-agent': 'Node.JS v0.4.0'
		});
	
		var date = new Date;
		var epochDate = date.getTime();
		
		var payload = {
			api_key: apiKey,
			uid: epochDate,
			arguments: {
				recipients: emailRecipients,
				
				headers: {
					subject: emailSubject,
					from: emailFrom
				},
				
				content: emailContent
				
			}
		}
		
		request.on('response', function (response) {});    
		request.end(JSON.stringify(payload));
		
	}
}