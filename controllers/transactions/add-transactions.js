const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');
// const { Conflict } = require('http-errors');

const addTransaction = async (req, res) => {
  const { _id } = req.user;

  const result = await Transaction.create({ ...req.body, owner: _id });
  // const result = await Transaction.create({ ...req.body });
  sendSuccessRes(res, { result }, 201);
};

module.exports = addTransaction;
