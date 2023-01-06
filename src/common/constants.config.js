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
    otpNoOfAttempts:'3',
   
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
