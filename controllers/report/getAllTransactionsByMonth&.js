// for ex: http://localhost:3000/api/transactions/i-2021-01 ("i" or "o")

const { sendSuccessRes } = require('../../helpers');
const { Transaction } = require('../../models');

const getAllTransactions = async (req, res) => {
  
  // console.log("in gAll");

  console.log('Object.keys(req.query)[0]:', Object.keys(req.query)[0]);

  const key = Object.keys(req.query)[0].toLowerCase();

  let typeTrAct; // получение типа тАкций из запроса
  if (key === 'i' || key === 'o') typeTrAct = key === 'i' ? true : false;
  else console.log('Error key !!!'); // if (typeTrAct) console.log('Доход');  else console.log('Расход');

  const searchMonth = Object.values(req.query)[0]; // получение порядк.номера месяца из запроса
  const year = searchMonth.substr(0, 5);
  const month = searchMonth.substr(5);
  const toDate =
    month === '12'
      ? year + '12-31'
      : year + ('0' + (+month + 1).toString()).slice(-2);

  // const result = await Transaction.find({ category: 'home' });
  // const result = await Transaction.find({},{_id:0,date:1,category:1});
  const result = await Transaction.find(
    {
      // все
      type: typeTrAct,
      owner: '61879723dcf34c690cabb318',
      // date: { $gte: '2021-01', $lt: '2021-02' }, // за месяц (первый)
      // date: { $gte: searchMonth, $lt: toDate }, // за месяц (первый)

      // date: { $gt: '2021-02', $lt: '2021-03' },  // за месяц (первый)
      // $and :[{date: { $gt: '2021-01' }},{date: { $lt: '2021-02' }}]
      // db.users.find ({$and : [{name: "Tom"}, {age: 32}]})
      // date: { $gt: '2021-01' }, // после gt
      // date: { $lt: '2021-02' }, // --- до lt
      // date: { $eq: '2021-02' }, // = eq
      // date: '2021-02', // = eq
    },
    { _id: 0, date: 1, category: 1, description: 1, type: 1 },
  ).sort({ date: 1 });
  //после

  // {age: {$lt : 30}}
  // console.log("!!!",toString(result[0].date));
  sendSuccessRes(res, { result });
};

module.exports = getAllTransactions;
