const responseService = require('../api/v1/common/services/response.service.js');

module.exports = (req, res, next) => {
    responseService.pathNotFound(req, res);
    next();
};
