const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { Transaction, User } = require('../../models');
const updateUserBalance = require('../../services/update-userBalance');

const removeTransaction = async (req, res, next) => {
  const { _id } = req.user;
  const { transactionId } = req.params;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} not found`);
  }
  const { amount, type } = transaction;

  const result = await Transaction.findByIdAndDelete(transactionId);

  const user = await User.findById(_id);
  if (!user) {
    throw new NotFound(`User with id=${_id} not found`);
  }

  const balanceAfter = updateUserBalance(user, amount, !type, _id);

  await User.findByIdAndUpdate(
    _id,
    { balance: balanceAfter },
    {
      new: true,
    },
  );

  sendSuccessRes(res, { result, message: 'Success delete' });
};

module.exports = removeTransaction;
