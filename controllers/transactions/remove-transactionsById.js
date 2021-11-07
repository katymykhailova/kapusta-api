const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');

const removeTransaction = async (req, res, next) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndDelete(transactionId);
  if (!result) {
    throw new NotFound(`Transaction with id=${transactionId} not found`);
  }
  sendSuccessRes(res, { message: 'Success delete' });
};

module.exports = removeTransaction;
