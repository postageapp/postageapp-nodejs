[PostageApp](http://postageapp.com) for Node.JS
===================================================

This is a module for Node.JS that allows you to send emails with PostageApp service.
Personalized transactional email sending can be offloaded to PostageApp via the JSON based API.

### [API Documentation](http://help.postageapp.com/faqs/api) &bull; [PostageApp FAQs](http://help.postageapp.com/faqs) &bull; [PostageApp Help Portal](http://help.postageapp.com)

Installation
------------

_Node Package Manager_

In your app directory type
`npm install postageapp`

_Manual_

- Download this: https://github.com/postageapp/postageapp-nodejs/tarball/master
- Unzip that download.
- Copy the resulting folder to `node_modules`
- Rename the folder you just copied to `postageapp`

_GIT Submodule_

In your app directory type:
<pre><code>git submodule add git@github.com:postageapp/postageapp-nodejs.git plugins/postage
git submodule init
git submodule update
</code></pre>

_GIT Clone_

In your `node_modules` directory type
<pre><code>git clone git@github.com:postageapp/postageapp-nodejs.git postageapp</code></pre>

Sending a Message
-----
When you require the library, make sure to specify your API key:

    var postageapp = require('postageapp')('YOUR API KEY HERE');

After that, you should be good to go. Load the module in your app and call the `sendMessage` function. Here is a sample of how to use it:

    var postageapp = require('postageapp')('YOUR API KEY HERE');
    postageapp.sendMessage(options, function callback() {});

The `options` parameter on the `sendMessage()` function is a hash that contains all of the arguments that you will be using in your API call. Here is an example API call:

	var options = {
		recipients: "email@address.com",

		subject: "Subject Line",
		from: "sender@example.org",

		content: {
			'text/html': '<strong>Sample bold content.</strong>',
			'text/plain': 'Plain text goes here'
		}
	}

You can use any of the arguments available to [send_message.json](http://help.postageapp.com/kb/api/send_message) when creating this hash.

Recipients can be passed along as a single string or as an array.

    recipients: "email@address.com";
    recipients: ["email1@address.com", "email2@address.com"];

If you wish to set Message Variables for each individual recipient, you just have to pass an array for each recipient.

    recipients: {
	    "email@example.com": {
		    'variable': 'Value'
	    },
	    "email2@example.com": {
		    'variable': 'Another Value'
	    }
    };

Content will accept an array for HTML and plain text content.

    content: {
    	'text/html': '<strong>Sample bold content.</strong>',
    	'text/plain': 'Plain text goes here'
    };

Subject and from can be simple strings.

    subject: 'Subject Line';
    from: 'sender@example.org';

Templates can be called by using the template slug from your PostageApp Projects.

	template: 'sample_template';

Message Variables needs to have an array passed into it with the global variable names and values.

    variables: {
    	'variable': 'Variable value',
    	'variable2': 'Another variable'
    };

Success and Error Callbacks
-----
The `sendMessage()` function takes two callback arguments - success and error. Callbacks are used to tell the PostageApp Node.JS plugin to execute some other code as soon as it is finished with sending your emails to PostageApp (or when an error occurs).

    var postageapp = require('postageapp')('YOUR API KEY HERE');
    postageapp.sendMessage(options, function (response, object) {
        console.log('HTTP Status code: ', response.statusCode);
        console.log('Message UID', object.response.uid);
    }, function (message, object) {
        console.log('Ack! An error has occurred: ', message);
    });

Getting Account Info
-----
You can get your PostageApp account info through the Node.JS plugin by using the `acountInfo()` function, which can be used as such:

    var postageapp = require('postageapp')('YOUR API KEY HERE');
    postageapp.accountInfo();

You can take a look at the documentation for [get_account_info.json](http://help.postageapp.com/kb/api/get_account_info) to learn about the typical response from the API server.

Getting Message Status
-----
You can the status of an individual message sent through PostageApp using the UID that your API call provides. The PostageApp Node.JS plugin creates a unique UID for each message sent through by using `Date.getTime()`. You then use that UID in `messageStatus()`.

    var postageapp = require('postageapp')('YOUR API KEY HERE');
    postageapp.messageStatus(options);

The `options` parameter in the `messageStatus()` function is a hash that contains one thing: the UID of the message you wish you retrieve.

    var options = {
      	desiredUID: 'message UID here',
    }

You will receive a JSON string back from the API server that should look something like this:

    {"response":{"status":"ok","uid":"message UID here"},"data":{"message_status":{"completed":1}}}

For more information about formatting of recipients, templates and variables please see the [PostageApp documentation](http://help.postageapp.com/kb/api/send_message).
