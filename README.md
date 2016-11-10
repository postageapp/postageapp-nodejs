# PostageApp for Node.JS

This is a module for [Node.js](http://nodejs.org/) that allows you to send
emails with [PostageApp](http://postageapp.com/), a service that makes it easy
to add personalized, transactional email to your application.

### [API Documentation](http://help.postageapp.com/faqs/api) &bull; [PostageApp FAQs](http://help.postageapp.com/faqs) &bull; [PostageApp Help Portal](http://help.postageapp.com)

## Installation

There are several ways to install this plugin depending on your requirements.
The most common method is via the Node Package Manager, NPM.

This version of the library **requires Node v6** or more recent. For older
Node.js installations you can use a version from the 1.1.x branch. The
1.1.5 release should be current but uses Node.js callback methods instead of
promises.

### NPM

In your application's main directory:

    npm install postageapp --save

## Sending a Message

When you require the library, make sure to specify your API key:

    var postageapp = require('postageapp')('ACCOUNT_API_KEY');

After that, you should be good to go. Load the module in your app and call the
`sendMessage` function. Here is a sample of how to use it:

    var postageapp = require('postageapp')('ACCOUNT_API_KEY');
    postageapp.sendMessage(options, function callback() {});

The `options` parameter on the `sendMessage()` function is a hash that contains
all of the arguments that you will be using in your API call. Here is an
example API call:

    var options = {
      recipients: "email@example.com",

      subject: "Subject Line",
      from: "sender@example.org",

      content: {
        'text/html': '<strong>Sample bold content.</strong>',
        'text/plain': 'Plain text goes here'
      }
    }

You can use any of the arguments available to
[send_message.json](http://help.postageapp.com/kb/api/send_message) when
creating this hash.

Recipients can be passed along as a single string or as an array:

    // String form: Comma separated list
    recipients: "recipient1@example.com, recipient2@example.com"

    // Array form: Individual addresses as strings
    recipients: [ "email1@example.com", "email2@example.com" ]

If you wish to set Message Variables for each individual recipient, create an
object with keys representing each recipient address:

    // Object form: Email address as key, object of key/values as content
    recipients: {
      "email@example.com": {
        'variable': 'Value'
      },
      "email2@example.com": {
        'variable': 'Another Value'
      }
    };

Content will accept an array for HTML and plain text content:

    content: {
      'text/html': '<strong>Sample bold content.</strong>',
      'text/plain': 'Plain text goes here'
    };

Subject and from can be simple strings:

    subject: 'Subject Line',
    from: 'sender@example.org'

Templates are called by using the template slug from your PostageApp projects:

    template: 'sample_template'

Message Variables needs to have an array passed into it with the global
variable names and values:

    variables: {
      'variable': 'Variable value',
      'variable2': 'Another variable'
    }

## Success and Error Callbacks

The `sendMessage()` function takes two callback arguments: success and error:

    var postageapp = require('postageapp')('ACCOUNT_API_KEY');

    postageapp.sendMessage(options).then((response) => {
      console.log('HTTP Status code: ', response.statusCode);
      console.log('Message UID', object.response.uid);
    }).catch((error) => {
      console.error(error);
    });

## Getting Account Info

You can get your PostageApp account info through the Node.js plugin by using the
`accountInfo()` function, which can be used as such:

    const PostageApp = require('postageapp');
    var postageapp = new PostageApp('ACCOUNT_API_KEY');

    postageapp.accountInfo();

You can take a look at the documentation for
[get_account_info.json](http://help.postageapp.com/kb/api/get_account_info) to
learn about the typical response from the API.

## Getting Message Status

You can the status of an individual message sent through PostageApp using the
UID that your API call provides. The PostageApp plugin creates a unique
UID for each message sent through by using `Date.getTime()`. You then use that
UID in `messageStatus()`.

    const PostageApp = require('postageapp');
    var postageapp = new PostageApp('ACCOUNT_API_KEY');

    postageapp.messageStatus({ uid: 'PREVIOUS_UID' }).then((status) => {
      console.log(status);
    });

You will receive a JSON string back from the API server that will look like:

    {"response":{"status":"ok","uid":"PREVIOUS_UID"},"data":{"message_status":{"completed":1}}}

For more information about formatting of recipients, templates and variables
please see the [PostageApp documentation](http://help.postageapp.com/kb/api/send_message).

## Configuration

### File Format

The configuration is read in from a JSON file that has this structure:

    {
      "host": "api.postageapp.com",
      "port": "443",
      "secure": secure,
      "apiKey": "__PROJECT_API_KEY__"
    }

The only one that's required is the `apiKey` value, the others are optional
and will default to what's shown here.

### Environment Variables

You can specify the configuration for your PostageApp account via a series of
environment variables, in a config file, or in a config file path expressed as
an environment variable:

 * `POSTAGEAPP_CONFIG` - Path to a JSON configuration file that will be loaded.
 * `POSTAGEPPP_API_KEY` - Which API key to use by default.
 * `POSTAGEAPP_HOST` - Which host to contact for the API (default `api.postageapp.com`)
 * `POSTAGEAPP_PORT` - Which port to contact for the API (default 443)
 * `POSTAGEAPP_SECURE` - Use HTTPS to connect to the API (default 1)

Any of these settings can be overruled by constructing a `PostageApp`
instance with different options. For example, if you're sending calls through
a custom HTTP proxy:

    var postageapp = new PostageApp({
      host: 'my.proxy',
      port: 8080,
      secure: false,
      apiKey: '__PROJECT_API_KEY'
    });
