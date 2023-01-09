const { ValidationError } = require('express-validation');
const responseService = require('../api/v1/common/services/response.service.js');

module.exports = (err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            responseService.unauthorized(req, res, err);
        } else if (err instanceof ValidationError) {
            responseService.validation(req, res, err);
        } else if (err.message === 'CORS') {
            responseService.forbidden(req, res, err);
        } else {
            responseService.fail(req, res, err);
        }

        next();
    };
