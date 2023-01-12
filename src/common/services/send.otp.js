const sendEmail = require("../../common/services/sendMail");
const constants = require("../../common/constants.config");
const models = require("../../common/models");
const { user } = require("pg/lib/defaults");
const { Users, UserRoles, UserSession, Profiles } = models;
const sendOtp = async (mailAddress, mailHtml = "",user) => {
  try {
    let todayDate = new Date();
    let OTP = constants.genOtp();

    let mail = await sendEmail(mailAddress, OTP);

  
    const otpExpiredAt = todayDate.setMinutes(todayDate.getMinutes() + 5);

      
    user.otp=OTP;
    user.otp_expiration=otpExpiredAt;
    user.no_of_attempts=0
    user.save();
   
     
    
  } catch (e) {
    return e;
  }
};
module.exports = sendOtp;
