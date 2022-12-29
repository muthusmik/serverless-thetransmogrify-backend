
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = password => bcrypt.hashSync(password, salt);


/**
   * comparePassword
   * @param {string} hashPassword
   * @param {string} password
   * @returns {Boolean} return True or False
   */

 const comparePassword = (hashedPassword, password) => {
    return bcrypt.compareSync(password, hashedPassword);
  };
  module.exports = {
      hashPassword,
      comparePassword

}
