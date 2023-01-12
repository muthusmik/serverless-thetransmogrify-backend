module.exports = {
    RECORD_CREATED: {
        CODE: 201,
        MESSAGE: 'Record created successfully',
    },
    RECORD_UPDATED: {
        CODE: 200,
        MESSAGE: 'Record updated successfully',
    },
    RECORD_DELETED: {
        CODE: 200,
        MESSAGE: 'Record deleted successfully',
    },
    RECORD_NOT_FOUND: {
        CODE: 404,
        MESSAGE: 'Record not found',
    },
    VALIDATION: {
        CODE: 400,
        MESSAGE: 'Validation error',
    },
    SUCCESS: {
        CODE: 200,
        MESSAGE: 'Success',
    },
    PATH_NOT_FOUND: {
        CODE: 404,
        MESSAGE: 'Invalid URL',
    },
    UNAUTHORIZED: {
        CODE: 401,
        MESSAGE: 'Unauthorized',
    },
    INTERNAL_SERVER_ERROR: {
        CODE: 500,
        MESSAGE: 'Something went wrong.',
    },
    FORBIDDEN: {
        CODE: 403,
        MESSAGE: 'Forbidden',
    },
    AWS_SES_CONFIG:{
        region: process.env.AWS_REGION,
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY,
        apiVersion: "2010-12-01"
    },

    ERROR_MESSAGE:{
        PASSWORD_ERROR_MESSAGE:"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 6-16 characters long.",
        EMAIL_ERROR_MESSAGE:"Please provide a valid email address."
    },
    otpNoOfAttempts:'3',
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      },
      AUTH_RESPONSE:{
        INVALID_TOKEN_MESSAGE:"Invalid access token",
        EXISTS_USER_MESSAGE:"User already exists",
        GRANT_TYPE: "password",
        ACCEPT_ENCODING:"gzip,deflate,compress",
        INVALIDE_USERNAME_PASSWORD:"invalid username or password",
        CONTENT_TYPE:"application/x-www-form-urlencoded",
        INVALID_USER_MESSAGE:"user does not exists!",
        LOGOUT_MESSAGE:"logout successfully!",
        PASSWORD_CONFIRMPASSWORD_SAME:"password and confirm password must be same!",
        PASSWORD_SUCCESSFULLY_CHANGED:"password changed successfully!",
      },

   
    otpNoOfAttemptsMessage:"You've reached the maximum no.of.attempts!.try Resend OTP  and try again!",
    expiration:{
        otpExpireInDays:1
    },
    INVALID_OTP:'OTP is invalid or Expired!',
    otpMessage:' OTP send successfully please check your email!', 
    OTP_SUCCESS_MESSAGE:'OTP verified successfully!',
      genOtp: () => {
    return Math.floor(1000 + Math.random() * 9000);
    // return 5555
  },
  genOtpMessage: (otp) => {
    return otp + ' is your OTP for your account!';
  },

  
  
};
