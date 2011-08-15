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
<pre><code>git clone git@github.com:postageapp/postageapp-nodejs.git postage</code></pre>

Sending a Message
-----
When you require the library, make sure to specify your API key:

    var postageapp = require('postageapp')('YOUR API KEY HERE');
    
After that, you should be good to go. Load the module in your app and call the `sendMessage` function. Here is a sample of how to use it:

    var postageapp = require('postageapp')('YOUR API KEY HERE');
    postageapp.sendMessage(options);

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
	
Message Variables needs to have an array passed into it with the global variable names and values.

    variables: {
    	'variable': 'Variable value',
    	'variable2': 'Another variable'
    };
    
For more information about formatting of recipients, templates and variables please see the [PostageApp documentation](http://help.postageapp.com/kb/api/send_message).