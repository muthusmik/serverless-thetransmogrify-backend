const constants=require('../constants.config');
const AWS=require('aws-sdk');

const sendMail=async (mailAddress,mailHtml="")=>{


    const params = {
        Source: `${process.env.AWS_SENDER_MAIL}`,
        Destination: {
          ToAddresses: [process.env.AWS_SENDER_MAIL,process.env.AWS_RECEIVER_MAIL],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `<p>Welcome to redgistry.</p>
                  <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Welcome Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
      </head>
      <body style="background-color: #e9ecef;">
      <h1>Your OTP is ${mailHtml}</h1>
       
      </body>
      </html>`,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "Welcome Email",
          },
        },
      };
    
    try {
      const data=await new AWS.SES({...constants.AWS_SES_CONFIG})
        .sendEmail(params)
        .promise()

        return {
          status:true,
          data:data,
          message:"Mail Sent Successfully"
        }
      
    } catch (error) {
      return {
        status:false,
        data:error,
        message:error.message
      }
    }

       
}

module.exports=sendMail