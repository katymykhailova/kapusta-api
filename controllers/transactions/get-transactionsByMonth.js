// for ex: http://localhost:3000/api/transactions?YYYYMM=202101
const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');
const { BadRequest } = require('http-errors');

const getTransactionsByMonth = async (req, res) => {
  const queryN = Object.keys(req.query)[0].toLowerCase();
  const query = Object.values(req.query)[0];
  const year = query.substr(0, 4);
  const month = query[4] + query[5];
  const fromDate = new Date(year + ' ' + month + 'UTC');

  const monthN = +month + 1 === 13 ? 1 : +month + 1;
  const yearN = +month + 1 === 13 ? +year + 1 : +year;
  const toDate = new Date(yearN.toString() + ' ' + monthN.toString() + 'UTC');

  if (query.length < 6 || +year < 2000 || +month > 12 || queryN !== 'yyyymm') {
    throw new BadRequest(
      "Frontender, query must be like '...transactions?YYYYMM=2021' (>1999)",
    );
  }

  const tActions = await Transaction.find(
    { owner: req.user._id, date: { $gte: fromDate, $lt: toDate } },
    { owner: 0, createdAt: 0, updatedAt: 0 },
  )
    .populate({ path: 'category', select: '_id name ' })
    .sort({ date: 1 });

  const sums = await Transaction.aggregate([
    {
      $match: {
        owner: req.user._id,
        date: { $gte: fromDate, $lt: toDate },
      },
    },
    {
      $unwind: '$category',
    },
    {
      $group: {
        _id: {
          description: '$description',
          category: '$category',
          type: '$type',
        },
        total_amounts: { $sum: '$amount' },
      },
    },
    {
      $project: {
        _id: 0,
        group: '$_id',
        total_amounts: 1,
      },
    },
  ]);

  sendSuccessRes(res, { tActions, sums });
};

module.exports = getTransactionsByMonth;
