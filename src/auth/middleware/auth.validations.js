const joi = require("joi");

const schema = {
    userCreate: joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")).required(),
        device_id: joi.string().required()
    }),

    verifyOtp: joi.object({
        email: joi.string().email().required(),
        otp: joi.string().required()
    }),

    
   resendOtp: joi.object({
        email: joi.string().email().required(),
        
    }),

    changePassword: joi.object({
        password: joi.string().pattern(new RegExp("^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$")).required(),
        confirmPassword:joi.string().required()
        
    }),
};

module.exports = schema;