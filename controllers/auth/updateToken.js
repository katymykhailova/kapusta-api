const { User } = require('../../models');

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate({ _id: id }, { token });
};

module.exports = updateToken;
