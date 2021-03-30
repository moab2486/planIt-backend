//app/middleware/verifyAuth.js
 
const jwt = require( 'jsonwebtoken');
const dotenv = require('dotenv' );
const message = require( '../helpers/status' );


dotenv.config();

/**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */

module.exports = async (req, res, next) => {
  const { token } = req.headers.authorization;
  if (!token) {
    message.errorMessage.error = 'Token not provided';
    return res.status(message.status.bad).send(message.errorMessage);
  }
  try {
    const decoded =  jwt.verify(token, process.env.SECRET);
    req.user = {
      email: decoded.email,
      role: decoded.role,
      username: decoded.username, 
    };
    next();
  } catch (error) {
    message.errorMessage.error = 'Authentication Failed';
    return res.status(message.status.unauthorized).send(message.errorMessage);
  }
};
