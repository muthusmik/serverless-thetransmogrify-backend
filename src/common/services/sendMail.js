const constants=require('../constants.config');
const AWS=require('aws-sdk');

const sendMail=async (mailAddress,mailHtml="")=>{
    const params = {
        Source: `${process.env.AWS_SENDER_MAIL}`,
        Destination: {
          ToAddresses: [...mailAddress],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `<p>Welcome to shopdot.</p>
                  <html>
      <head>
      
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Welcome Email</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        
      </head>
      <body style="background-color: #e9ecef;">
      <h1>verification mail</h1>
      <a target="_blank" href=http://localhost:4000/api/v1/auth/verify/${mailHtml}>Click Here to Verify</a>
      
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