
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('../config/settings'); 

class AuthService {
  /**
   * @param {Object} userDetails 
   * @returns {String} 
   */
  static generateToken(userDetails) {
    return jwt.sign(userDetails, jwtSecretKey, { expiresIn: '1h' });
  }

  /**
   * @param {String} token 
   * @returns {Object|null} 
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, jwtSecretKey);
    } catch (error) {
      return null;
    }
  }
}

module.exports = AuthService;
