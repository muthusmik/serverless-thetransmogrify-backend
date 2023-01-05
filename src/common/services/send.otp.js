const sendEmail = require("../../common/services/sendMail");
const constants = require("../../common/constants.config");

const sendOtp = async (mailAddress,mailHtml="")=>{

try{
    let OTP = constants.genOtp();
           
    let mail =  await sendEmail(mailAddress, OTP);
     
    return '5555'
}
catch(e){
    return e
}
           
}
module.exports=sendOtp