const { User } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  sendSuccessRes(res, { message: 'No content' }, 204);
};

module.exports = logout;
