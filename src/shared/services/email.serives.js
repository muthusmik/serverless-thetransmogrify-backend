const AWS = require('aws-sdk');

const SES_CONFIG = {
    accessKeyId: 'AKIAT6LJAEBCBWVIDXVW',
    secretAccessKey: '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',
    region: 'us-west-1',
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = async (recipientEmail, name) => {
 try{
    let params = {
      Source: 'buusha@thetransmogrify.in',
      Destination: {
        ToAddresses: [
          recipientEmail
        ],
      },
      ReplyToAddresses: [],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: 'This is the body of my email!',
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Hello, ${name}!`,
        }
      },
    };
    return AWS_SES.sendEmail(params).promise();
}
catch(e){
    console.log('mail error ',e)
    return e;
}
};

module.exports = {
    sendEmail,
    
  };