//import env from '../../env';
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
 * empty helper method
 * @param {string, integer} input
 * @returns {Boolean} True or False
*/
exports.empty = (input) => {
  if (input === undefined || input === '') {
    return true;
  }
};

exports.generateUserToken = (email, id, role, first_name, last_name) => {
  const token = jwt.jwt.sign({
    email,
    user_id: id,
    role,
    first_name,
    last_name
  },
  process.env.TOKEN_SECRET, {expires_in: '3d'});
  return token
};
