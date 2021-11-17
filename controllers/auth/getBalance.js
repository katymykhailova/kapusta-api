const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { User } = require('../../models');

const getBalance = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findById(_id, 'balance');
  if (!result) {
    throw new NotFound(`User with id=${_id} not found`);
  }
  sendSuccessRes(res, { result });
};
module.exports = getBalance;
