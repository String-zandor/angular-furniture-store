## Grey Space - Furniture Store

### Additional notes
In MailService, due to the limitation of the free Mailgun account, placeholder values for are assigned instead of actual username and key values, otherwise Mailgun will block the account used for the API when the code is uploaded in a public repository. See below:

mg = this.mailgun.client({
    username: 'insert-api-username-here',
    key: 'insert-api-key-here'
  })

As a consequence, the reset password functionality is disabled, unless you change the values to your own Mailgun username and key.

The actual username and key for this project will be in the code during the demonstration.

