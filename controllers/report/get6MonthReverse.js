// for ex: http://localhost:3000/api/report?i=2021 ('i[nput]-доход, o[utput]-расход')
const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');
const { BadRequest } = require('http-errors');

const getYearByMonthAndType = async (req, res) => {
  // function getLastDayOfMonth(year, month) {
  //   const date = new Date(year, month + 1, 0);
  //   return date.getDate();
  // }
  // console.log(getLastDayOfMonth(2021, 0)); // 31
  // alert(getLastDayOfMonth(2012, 1)); // 29
  // alert(getLastDayOfMonth(2013, 1)); // 28
  const key = Object.keys(req.query)[0].toLowerCase();
  const query = Object.values(req.query)[0];
  const year = query.substr(0, 4);
  const month = query[4] + query[5];

  if (
    query.length < 6 ||
    +year < 2000 ||
    +month > 12 ||
    !(key === 'i' || key === 'o')
  ) {
    throw new BadRequest(
      "Frontender, query must be like '...transactions?YYYYMM=202111'(YYYY>1999)",
    );
  }

  let toYear = year;
  let toMonth = month;
  if (+toMonth + 1 > 12) {
    toMonth = 1;
    toYear = +toYear + 1;
  } else toMonth = +toMonth + 1;
  toYear = toYear.toString();
  toMonth = toMonth.toString();
  const toDate = new Date(toYear + ' ' + toMonth + 'UTC');
  toDate.setDate(toDate.getDate() - 1);

  let fromYear = year;
  let fromMonth = month;
  if (+fromMonth - 5 < 1) {
    fromMonth = +fromMonth - 5 + 12;
    fromYear = +fromYear - 1;
  } else fromMonth = +fromMonth - 5;
  fromYear = fromYear.toString();
  fromMonth = fromMonth.toString();
  const fromDate = new Date(fromYear + ' ' + fromMonth + 'UTC');

  const typeTrAct = key === 'i';
  const result = await Transaction.find(
    {
      type: typeTrAct,
      owner: req.user._id,
      date: { $gte: fromDate, $lt: toDate },
    },
    { _id: 0, date: 1, amount: 1 },
  ).sort({ date: 1 });

  const sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  result.forEach(tAction => (sums[tAction.date.getMonth()] += tAction.amount));

  const fromDateMonth = fromDate.getMonth();
  const resultSums = [0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 6; i++) {
    resultSums[i] =
      fromDateMonth + i > 11
        ? sums[fromDateMonth + i - 12]
        : sums[fromDateMonth + i];
  }
  sendSuccessRes(res, resultSums.reverse());
};
module.exports = getYearByMonthAndType;
