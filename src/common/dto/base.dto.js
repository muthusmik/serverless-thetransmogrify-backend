const { Op } = require('sequelize');

class BaseDto {
    constructor(model) {
        this.model = model;
    }
}

module.exports = BaseDto;
