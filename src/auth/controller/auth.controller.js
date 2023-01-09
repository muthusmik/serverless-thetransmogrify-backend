const BaseController = require("../../common/controllers/base.controller");
const authRepository = require("../repository/auth.repository");
const authDto = require("../middleware/auth.dto");
const responseService = require("../../common/services/response.service");
const validation = require("../../shared/middleware/validate.middleware");
const authValidation = require("../../auth/middleware/auth.validations");
const {
  signUpRequiredFields,
  loginRequiredFields,
  fieldValidation,
  changePasswordRequiredFields,
  verifyOtpRequiredFields,
  resendOtpRequiredFields,
} = require("../middleware/auth.validation");

//const fieldValidation = require('../../config/common-validation')
// const sendEmail= require("../../shared/services/email.serives")
const sendEmail = require("../../common/services/sendMail");
const constants = require("../../common/constants.config");
const { fieldValidate } = require("../../middleware/validate.middleware");

class AuthController extends BaseController {
  constructor(respService, repository, dto) {
    super(respService, repository, dto);
    this.repository = repository;
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
  }

  async create(req) {
    try {

      let success = false;

      let requiredFields = await signUpRequiredFields();
      let validations = await fieldValidation(req, requiredFields);
       
        if (validations.statusCode === 400) {
          return { success: success, data:validations };
        }
       

      const createDto = this.dto.createUser(req);

      const record = await this.repository.createUser(createDto);

      return { success: !success, data: record };
    } catch (e) {
      console.log("e...", e);
      return e;
    }
  }

  async login(req) {
    try {
      let requiredFields = await loginRequiredFields();
      let validations = await fieldValidation(req, requiredFields);

      if (req) {
        if (validations.data.statusCode === 400) {
          return { success: success, data:validations };
        }
      }
      let success = false;

      const loginDto = this.dto.loginUser(req);

      const login = await this.repository.login(loginDto);

      if (login.statusCode === 400) {
        return { success: success, data:validations };
      }
      return { success: !success, data: login };
    } catch (e) {
      delete e.stack;
      return e;
    }
  }

  async otpVerification(req, res) {
    try {
      let success = false;
      const otpDto = this.dto.verifyOtpDto(req);
      let requiredFields = await verifyOtpRequiredFields();

      let validations = await fieldValidation(req, requiredFields);

      if (req) {
        if (validations.statusCode === 400) {
          return { success: success, data:validations };
        }
      }
      const verifyOtp = await this.repository.verifyOtp(otpDto);
      return { success: !success, data: verifyOtp };
    } catch (e) {
      return e;
    }
  }
  async resendOtp(req) {
    try {
      let success = false;
      let requiredFields = await resendOtpRequiredFields();
      let validations = await fieldValidation(req, requiredFields);

      if (validations.statusCode === 400) {
        return { success: success, data:validations };
      }

      const resendOtpDto = this.dto.resendOtpDto(req);
      const otp = await this.repository.resendOtp(resendOtpDto);
      return { success: !success, data: otp };
    } catch (e) {
      return e;
    }
  }

  async logOut(req) {
    try {
      let success = false;
      let id = req.user.id;
      const logout = await this.repository.logOut(id);
      return { success: !success, data: logout };
    } catch (e) {
      return e;
    }
  }

  // async changePassword(req, res) {
  //   try {
  //     let requiredFields = await changePasswordRequiredFields();

  //     if (req.body) {
  //       let validate = await validation.validation(req.body, requiredFields);

  //       if (validate.data.statusCode === 400) {
  //         return validate;
  //       }
  //     }
  //     let success = false;
  //     const id = req.user.id;
  //     const changePasswordDto = this.dto.changeUserPassword(req.body);
  //     if (changePasswordDto.password != changePasswordDto.confirmPassword) {
  //       return {
  //         success: success,
  //         data: "password and confirm password must be same",
  //       };
  //     }

  //     const changePassword = await this.repository.changeUserPassword(
  //       id,
  //       changePasswordDto
  //     );

  //     if (!changePassword)
  //       return {
  //         success: success,
  //         data: "Old password does not match. Pleae try again!!",
  //       };

  //     if (changePassword.status == 200) {
  //       return { success: success, data: "password changed successfully" };
  //     } else {
  //       return { success: !success, data: changePassword };
  //     }
  //   } catch (e) {
  //     return e;
  //   }
  // }

  async changePassword(req, res) {
    try {
      let requiredFields = await changePasswordRequiredFields();

      if (req.body) {
        let validate = await validation.validation(req.body, requiredFields);

        if (validate.data.statusCode === 400) {
          return validate;
        }
      }
      let success = false;
      const id = req.user.id;
      const changePasswordDto = this.dto.changeUserPassword(req.body);
      if (changePasswordDto.password != changePasswordDto.confirmPassword) {
        return {
          success: success,
          data: "password and confirm password must be same!",
        };
      }

      const changePassword = await this.repository.changeUserPassword(
        id,
        changePasswordDto
      );

      if (changePassword.status == 200) {
        return { success: success, data: "password changed successfully!" };
      } else {
        return { success: !success, data: changePassword };
      }
    } catch (e) {
      return e;
    }
  }
}

module.exports = new AuthController(responseService, authRepository, authDto);
