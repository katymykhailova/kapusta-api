// for ex: http://localhost:3000/api/expenses?i=202101(YYYYMM)

const { sendSuccessRes } = require('../../helpers');
const { Transaction, Category } = require('../../models');

const monthDetalReport = async (req, res) => {
  console.log('in monthDetalReport');

  const key = Object.keys(req.query)[0].toLowerCase();
  let typeTrAct; // получение типа искомых тАкций из запроса
  if (key === 'i' || key === 'o') typeTrAct = key === 'i' ? true : false;
  else console.log('Error type !!!'); // if (typeTrAct) console.log('Доход');  else console.log('Расход');

  const query = Object.values(req.query)[0];
  // console.log("query:",query);
  const yyyymm = query.substr(0, 6);
  // console.log("yyyymm:",yyyymm);
  const year = yyyymm.substr(0, 4); // получение 4х цифр года из запроса, с отбрасыванием остального
  const month = yyyymm[4] + yyyymm[5];
  // console.log("year,month:",year,month);

  const result = await Category.find({}, { name: 1 });
  
  console.log(result);

  // const toDate = year + '-12-31';
  // const result = await Transaction.find(
  //   {
  //     type: typeTrAct,
  //     owner:req.user._id,
  //     date: { $gte: year, $lt: toDate },
  //   },
  //   {
  //     _id: 0,
  //     date: 1,
  //     amount: 1,
  //   },
  // ).sort({ date: 1 });

  // const sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // result.forEach(tAction => (sums[tAction.date.getMonth()] += tAction.amount));

  // ============ debug block =================
  // удалить и раскоментировать строку за ним
  // sums.forEach((monthSum, monthNum) => console.log(monthNum, '-', monthSum));
  // console.log("req:",req.user._id);
  const debugResult = await Transaction.find(
    {
      // фильтация (без полей - все)
      type: typeTrAct, // owner: '61879723dcf34c690cabb318',
      owner: req.user._id,
      // date: { $gte: year, $lt: toDate }, // за указанный в запросе год, вплоть до 31дек
    },
    {
      //список полей, забираемых из БД
      _id: 0,
      date: 1,
      category: 1,
      description: 1,
      type: 1,
      amount: 1,
      owner: 1,
    }, // {date:1}
  ).sort({ date: 1 });
  sendSuccessRes(res, { debugResult });
  // ----------- end debug block-----------------

  // sendSuccessRes(res, { month });
};

module.exports = monthDetalReport;
