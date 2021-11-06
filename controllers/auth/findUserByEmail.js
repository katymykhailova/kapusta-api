const { User } = require('../../models');

const findByEmail = async email => {
  return await User.findOne({ email });
};

module.exports = findByEmail;
