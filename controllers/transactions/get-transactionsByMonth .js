// for ex: http://localhost:3000/api/transactions?202101(YYYYMM)
const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');

const getTransactionsByMonth = async (req, res) => {
  const query = Object.keys(req.query)[0];
  const year = query.substr(0, 4);
  const month = query[4] + query[5];
  const fromDate = new Date(year + ' ' + month + 'UTC');

  const monthN = +month + 1 === 13 ? 1 : +month + 1;
  const yearN = +month + 1 === 13 ? +year + 1 : +year;
  const toDate = new Date(yearN.toString() + ' ' + monthN.toString() + 'UTC');

  const result = await Transaction.find(
    {
      owner: req.user._id,
      date: { $gte: fromDate, $lt: toDate },
    },
    {
      owner: 0,
      createdAt: 0,
      updatedAt: 0,
    },
  ).sort({ date: 1 });

  sendSuccessRes(res, { tActionsMonth: result });
};

module.exports = getTransactionsByMonth;
