require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

/**
   * hashedPassword helper method
   * @param {string} password
   * @returns {Boolean} True or False
   */
  exports.hashPassword = (password) => {
    const hashPassword = bcrypt.hashSync(password, saltRounds)
    return hashPassword;
  };

/**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
exports.isValidEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/**
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
*/
exports.validatePassword = (password) => {
  if (password.length <= 5 || password === '') {
    return false;
  } return true;
};

/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
*/
exports.isEmpty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
  if (input.replace(/\s/g, '').length) {
    return false;
  } return true;
};

/**
 * isEmpty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
*/
exports.comparePassword = (password, dbpassword) => {
  const result = bcrypt.compareSync(password, dbpassword )
    if(result) {
      return true
    } else {
      return false
    }
};

/**
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
*/
exports.empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

exports.generateUserToken = (email, phone_number, id) => {
  const access_token = jwt.sign ({ email, phone_number, id }, 
                                process.env.ACCESS_TOKEN_SECRET, 
                                {expiresIn: process.env.ACCESS_TOKEN_LIFE});
  
  return access_token
};

exports.generateRefreshToken = (email, id, phone_number) => {
  const refresh_token = jwt.sign ({ email, id, phone_number }, 
                                process.env.REFRESH_TOKEN_SECRET);
  return refresh_token
};
