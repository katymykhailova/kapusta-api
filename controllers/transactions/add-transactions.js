const { sendSuccessRes } = require('../../helpers');
const { Transaction, User } = require('../../models');
const { NotFound } = require('http-errors');
const updateUserBalance = require('../../services/update-userBalance');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    throw new NotFound(`User with id=${_id} not found`);
  }

  const balanceAfter = updateUserBalance(user, amount, type, _id);

  await User.findByIdAndUpdate(
    _id,
    { balance: balanceAfter },
    {
      new: true,
    },
  );

  const newTransaction = await Transaction.create({ ...req.body, owner: _id });
  const result = await Transaction.findById(newTransaction.id).populate({ path: 'category', select: '_id name ' });
  sendSuccessRes(res, { result }, 201);
};

module.exports = addTransaction;
