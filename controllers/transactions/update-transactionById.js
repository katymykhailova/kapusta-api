const { sendSuccessRes } = require('../../helpers');
const { NotFound } = require('http-errors');
const { Transaction } = require('../../models');

const updateTransaction = async (req, res) => {
  const { transactionId } = req.params;
  const result = await Transaction.findByIdAndUpdate(transactionId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${transactionId} not found`);
  }
  sendSuccessRes(res, { result });
};

module.exports = updateTransaction;
