var http = require('http');

module.exports = function(apiKey) {
  return {
    apiCall: function (emailRecipients, emailContent, emailSubject, emailFrom, emailVariables) {
      var api = http.createClient(80, 'api.postageapp.com');

      var request = api.request('POST', '/v.1.0/send_message.json', 
      {
        'host': 'api.postageapp.com',
          'content-type': 'application/json',
          'user-agent': 'PostageApp Node.JS 0.0.1 (Node.JS ' + process.version + ')'
      });
      
      var templateName = new String();
      
      if (isNaN(emailContent)) {
        templateName = emailContent;
        emailSubject = null;
        emailContent = null;
        emailFrom = null;
      } else if (isArray(emailContent)) {
        
      }
    
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
          
          content: emailContent,
          
          template: templateName,
          
          variables: emailVariables
          
        }
      }
      
      request.on('response', function (response) {});    
      request.end(JSON.stringify(payload));
      
    }
  }
};
