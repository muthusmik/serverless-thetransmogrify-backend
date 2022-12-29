const Joi = require('joi');

const createUser = {
    body: Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(8).required(),
        device_id: Joi.string().required(),
    }),
};

const changePassword = {
    body: Joi.object().keys({
         email: Joi.string().email({ tlds: { allow: false } }).required(),
         password: Joi.string().min(8).required(),
        confirmPassword: Joi.string().min(8).required(),
    }),
};

const loginUser = {
    body: Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(8).required(),
        device_id: Joi.string().required(),
    }),
};
const sendVerificationMail = {
    body: Joi.object().keys({
        id:Joi.number().required()
    }),
};

module.exports = {
    createUser,
    loginUser,
    sendVerificationMail,
    changePassword
};
