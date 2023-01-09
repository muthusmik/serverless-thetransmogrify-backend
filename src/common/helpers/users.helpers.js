const constants = require("../constants.config")


exports.modifyResponseForGetProfiles = async (userdata)=>{

    try{
 
             let data = { 
                 
                id: userdata.id,
                
             
            }
             return data
    }
    catch(e){
        return e
    }
}

 