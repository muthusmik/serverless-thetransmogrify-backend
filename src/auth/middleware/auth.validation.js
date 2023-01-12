const { object } = require("joi");

 const validation = require("../../shared/middleware/validate.middleware");
const constants = require("../../common/constants.config");

 

// exports.signUpRequiredFields = async () => {
//   let requiredFields = {
//     email: "",
//     password: "",
//     device_id: "",
//   };
//   return requiredFields;
// };

// const isEmail = (email) => {
//   const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

   
//   return regex.test(email);
// };

// exports.isEmail = isEmail;

const isMobileNumber = (mobileNumber) => {
  const regex = /^[0]?[6789]\d{9}$/;
  return regex.test(mobileNumber);
};
exports.isMobileNumber = isMobileNumber;

const isPassword = (email) => {
  const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;
  return regex.test(email);
};

exports.isPassword = isPassword;

exports.loginRequiredFields = async () => {
  let requiredFields = {
    email: "",
    password: "",
    device_id: "",
  };
  return requiredFields;
};

exports.verifyOtpRequiredFields = async () => {
  let requiredFields = {
    email: "",
    otp:""
  };
  return requiredFields;
};

exports.resendOtpRequiredFields = async () => {
  let requiredFields = {
    email: "",
    
  };
  return requiredFields;
};


exports.changePasswordRequiredFields = async () => {
  let requiredFields = {
    password: "",
    confirmPassword: "",
  };
  return requiredFields;
};

exports.fieldValidation = async (body, requiredFields) => {
  if (body.email) {
    const validEmail = isEmail(body.email);

    if (!validEmail)
    {
    let data = {
        statusCode: 400, message: constants.ERROR_MESSAGE.EMAIL_ERROR_MESSAGE 
     
    };
      return data
  }  
       
  } 
    if (body.password) {
      const validPassword = isPassword(body.password);
     
      if (!validPassword) {
        let data = {
          statusCode: 400,
          message: constants.ERROR_MESSAGE.PASSWORD_ERROR_MESSAGE 
         
        };
        
        return data;
      }
    }
 
  let validate = await validation.validation(body, requiredFields);

  if (validate.data.statusCode === 400) {
    return validate.data;
  }
   return {
    validate,
  };
};
