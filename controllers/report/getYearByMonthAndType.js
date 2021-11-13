// for ex: http://localhost:3000/api/report?i=2021 ('i[nput]-доход, o[utput]-расход')
const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');
const { BadRequest } = require('http-errors');

const getYearByMonthAndType = async (req, res) => {
  const key = Object.keys(req.query)[0].toLowerCase();
  const query = Object.values(req.query)[0];
  const year = query.substr(0, 4);
  if (year.length < 4 || +year < 2000 || !(key === 'i' || key === 'o')) {
    throw new BadRequest(
      "Frontender, query must be like '...report?i=YYYY' (i[nput]/o[utput]-доход/расход; >1999)",
    );
  }
  const typeTrAct = key === 'i';
  const result = await Transaction.find(
    {
      type: typeTrAct,
      owner: req.user._id,
      date: { $gte: year, $lt: year + '-12-31' },
    },
    { _id: 0, date: 1, amount: 1 },
  ).sort({ date: 1 });
  const sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  result.forEach(tAction => (sums[tAction.date.getMonth()] += tAction.amount));
  // console.log(sums.reduce((a, b) => a + b));
  sendSuccessRes(res, sums);
};
module.exports = getYearByMonthAndType;
