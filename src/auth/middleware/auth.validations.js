const Joi = require('joi');

const createUser = {
    body: Joi.object().keys({
        
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().min(8).required(),
        device_id: Joi.string().required(),
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
    sendVerificationMail
};
