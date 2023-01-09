const { validate } = require('express-validation');

const vOptions = { keyByField: true };
const joiOptions = { abortEarly: false, allowUnknown: true };

const fieldValidate = (schema) => validate(schema, vOptions, joiOptions);

module.exports = fieldValidate;
