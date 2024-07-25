//Twilio config
const twilio = require('twilio');
const accountSid = process.env.TWILIOACCOUNTSID;
const authToken = process.env.TWILIOAUTHTOKEN;
const Client = twilio(accountSid,authToken);
module.exports= Client;

