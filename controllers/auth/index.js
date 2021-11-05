const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const { googleAuth, googleRedirect } = require('./googleAuth');

module.exports = {
  signup,
  login,
  logout,
  googleAuth,
  googleRedirect,
};
