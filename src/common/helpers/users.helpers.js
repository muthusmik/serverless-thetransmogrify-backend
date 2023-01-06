const constants = require("../constants.config")


exports.modifyResponseForGetProfiles = async (userdata)=>{

    try{
 
             let data = { 
                 
                id: userdata.id,
                
                // access_token:existingUser.access_token,
                // message:constants.OTP_SUCCESS_MESSAGE
            }
             console.log('data..............................',data)
             return data
    }
    catch(e){
        return e
    }
}

 