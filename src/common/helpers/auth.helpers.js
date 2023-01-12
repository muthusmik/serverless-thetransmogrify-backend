const constants = require("../constants.config")


exports.modifyResponseForVerifyOtp = async (existingUser)=>{

    try{

             existingUser.no_of_attempts=0
             existingUser.otp=null
             existingUser.is_otp_verified = true
             let data = { 
                 
                id: existingUser.id,
                status:true,
                statusCode:200,
                access_token:existingUser.access_token,
                message:constants.OTP_SUCCESS_MESSAGE
            }
             existingUser.save()
             return data
    }
    catch(e){
        return e
    }
}

exports.retryAttemptsForVerifyOtp= async (existingUser)=>{
            try{
                existingUser.no_of_attempts = existingUser.no_of_attempts == null ? 0 : existingUser.no_of_attempts
                existingUser.no_of_attempts = parseInt(existingUser.no_of_attempts) + 1;
                existingUser.save();
                return existingUser
            }
            catch(e){
                return e
            }
}