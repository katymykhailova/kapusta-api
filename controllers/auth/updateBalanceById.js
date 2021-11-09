const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { User } = require('../../models');

const updateUserById = async (req, res) => {
  const { _id } = req.user;
  const { balance } = req.body;
  const result = await User.findByIdAndUpdate(
    _id,
    { balance },
    {
      new: true,
    },
  );
  if (!result) {
    throw new NotFound(`Contact with id=${_id} not found`);
  }
  sendSuccessRes(res, { balance });
};
module.exports = updateUserById;
