const bcrypt = require("bcryptjs");

const {profileUpdate,roleCreate,updateRole } = require("../middleware/user.validation");
const saltRounds = 10;

const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = (password) => bcrypt.hashSync(password, salt);

 
/**
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */

const comparePassword = (hashedPassword, password) => {
  return bcrypt.compareSync(password, hashedPassword);
};

 

const roleCreateValidation = async (req) => {
  try {
    const value =   roleCreate.validate(req);

    if (value.error) {
      let data = {
        data: {
          success: false,
          statusCode: 400,
          message: value.error.details[0].message,
        },
      };
      throw data;
    } else {
      return true;
    }
  } catch (e) {
    throw e;
  }
};

const updateRoleValidation = async (req) => {
     const value =   updateRole.validate(req);
   

    if (value.error) {
      let data = {
        data: {
          success: false,
          statusCode: 400,
          message: value.error.details[0].message,
        },
      };
      throw data;
    } else {
      return true;
    }
  
   
};


const  profileUpdateValidation = async (req) => {
   
  const value =   profileUpdate.validate(req);

  if (value.error) {
    let data = {
      data: {
        success: false,
        statusCode: 400,
        message: value.error.details[0].message,
      },
    };
    throw data;
  } else {
    return true;
  }

 
};


module.exports = {
  hashPassword,
  comparePassword,
  profileUpdateValidation,
  updateRoleValidation,
  roleCreateValidation
};

exports.verifyOtpRequiredFields = async () => {
  let requiredFields = {
    email: "",
    otp: "",
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

    if (!validEmail) {
      let data = {
        statusCode: 400,
        message: constants.ERROR_MESSAGE.EMAIL_ERROR_MESSAGE,
      };
      return data;
    }
  }
  if (body.password) {
    const validPassword = isPassword(body.password);

    if (!validPassword) {
      let data = {
        statusCode: 400,
        message: constants.ERROR_MESSAGE.PASSWORD_ERROR_MESSAGE,
      };
      console.log("data.................1", data);
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
