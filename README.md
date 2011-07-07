[PostageApp](http://postageapp.com) for Node.JS
===================================================

This is a module for Node.JS that allows you to send emails with PostageApp service.
Personalized transactional email sending can be offloaded to PostageApp via the JSON based API.

### [API Documentation](http://help.postageapp.com/faqs/api) &bull; [PostageApp FAQs](http://help.postageapp.com/faqs) &bull; [PostageApp Help Portal](http://help.postageapp.com)

Installation
------------

_Manual_

- Download this: https://github.com/JonLim/postageapp-nodejs/tarball/master
- Unzip that download.
- Copy the resulting folder to `node_modules`
- Rename the folder you just copied to `postageapp`

_GIT Submodule_

In your app directory type:
<pre><code>git submodule add git@github.com:JonLim/postageapp-nodejs.git plugins/postage
git submodule init
git submodule update
</code></pre>

_GIT Clone_

In your `node_modules` directory type
<pre><code>git clone git@github.com:JonLim/postageapp-nodejs.git postage</code></pre>

_Node Package Manager_

In your app directory type
`npm install postageapp`

Usage
-----

    var postageapp = require('postageapp');
    postageapp.apiCall(recipients, content, subject, from, variables);
    
Recipients can be passed along as a single string or as an array.

    recipients = "email@address.com";
    recipients = ["email1@address.com", "email2@address.com"];
    
If you wish to set Message Variables for each individual recipient, you just have to pass an array for each recipient.

    recipients = {
	    "email@example.com": {
		    'variable': 'Value'
	    }, 
	    "email2@example.com": {
		    'variable': 'Another Value'
	    }
	};
    
Content will accept an array for HTML and plain text content. If it is a string, it will assume that you are naming a template.

    content = {
    	'text/html': '<strong>Sample bold content.</strong>',
    	'text/plain': 'Plain text goes here'
    };
    content = 'TEMPLATE_NAME';
    
Subject and from can be simple strings.

    subject = 'Subject Title';
    from = 'sender@example.org';

If you are using a template name with defined subject and from values, just set these to null.

	subject = null;
	from = null;
	
Message Variables needs to have an array passed into it with the variable names and values.

    variables = {
    	'variable': 'Variable value',
    	'variable2': 'Another variable'
    };
    
For more information about formatting of recipients, templates and variables please see the [PostageApp documentation](http://help.postageapp.com/kb/api/send_message).