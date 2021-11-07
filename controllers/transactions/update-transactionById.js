const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { Transaction, User } = require('../../models');
const updateUserBalance = require('../../services/update-userBalance');

const updateTransaction = async (req, res) => {
  const { _id } = req.user;
  let { amount, type } = req.body;
  const { transactionId } = req.params;
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new NotFound(`Transaction with id=${transactionId} not found`);
  }
  const { amount: prevamount } = transaction;

  const result = await Transaction.findByIdAndUpdate(transactionId, req.body, {
    new: true,
  });

  if (amount !== prevamount) {
    type = amount > prevamount;
    amount = amount > prevamount ? amount - prevamount : prevamount - amount;
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
  }
  sendSuccessRes(res, { result });
};

module.exports = updateTransaction;
