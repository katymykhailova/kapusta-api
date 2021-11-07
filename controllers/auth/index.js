const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const { googleAuth, googleRedirect } = require('./googleAuth');
const findByEmail = require('./findUserByEmail');
const updateToken = require('./updateToken.js');

module.exports = {
  signup,
  login,
  logout,
  googleAuth,
  googleRedirect,
  findByEmail,
  updateToken,
};
