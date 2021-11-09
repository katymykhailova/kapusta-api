// for ex: http://localhost:3000/api/report?i=2021 ('i[nput]-доход, [o]utput-расход:')
const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');

const getYearByMonthAndType = async (req, res) => {
  const key = Object.keys(req.query)[0].toLowerCase();
  let typeTrAct;
  if (key === 'i' || key === 'o') typeTrAct = key === 'i' ? true : false;
  else console.log('Error type !!!');

  const query = Object.values(req.query)[0];
  const year = query.substr(0, 4);
  const toDate = year + '-12-31';
  const result = await Transaction.find(
    {
      type: typeTrAct,
      owner: req.user._id,
      date: { $gte: year, $lt: toDate },
    },
    {
      _id: 0,
      date: 1,
      amount: 1,
    },
  ).sort({ date: 1 });

  const sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  result.forEach(tAction => (sums[tAction.date.getMonth()] += tAction.amount));

  sendSuccessRes(res, { sumsByMonth: sums });
};

module.exports = getYearByMonthAndType;
