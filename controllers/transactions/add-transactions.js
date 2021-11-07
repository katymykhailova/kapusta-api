const { sendSuccessRes } = require('../../helpers');
const { Transaction, User } = require('../../models');
const { NotFound } = require('http-errors');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const amountNumber = Number(amount);
  let balanceAfter;
  const resultBalance = balance => {
    return type ? balance + amountNumber : balance - amountNumber;
  };

  const user = await User.findById(_id);
  if (!user) {
    throw new NotFound(`User with id=${_id} not found`);
  }

  const userBalance = user.balance;
  if (userBalance || userBalance === 0) {
    balanceAfter = resultBalance(userBalance);
  } else {
    balanceAfter = amountNumber;
  }

  await User.findByIdAndUpdate(
    _id,
    { balance: balanceAfter },
    {
      new: true,
    },
  );
  const result = await Transaction.create({ ...req.body, owner: _id });
  sendSuccessRes(res, { result }, 201);
};

module.exports = addTransaction;
