 
exports.signUpRequiredFields = async () => {
     let requiredFields = {
        email: "",
        password:"",
        device_id:"",
      };
      return requiredFields

}

exports.loginRequiredFields = async () => {
    let requiredFields = {
       email: "",
       password:"",
       device_id:"",
     };
     return requiredFields

}


exports.changePasswordRequiredFields = async () => {
    let requiredFields = {
         password: "",
        confirmPassword:"",
         
     };
     return requiredFields

}
 
