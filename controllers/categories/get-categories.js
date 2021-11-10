const { sendSuccessRes } = require('../../helpers');
const { Category } = require('../../models');

const categories = async (req, res) => {
  // const { _id } = req.user;
  const result = await Category.find({}, '_id name');
  sendSuccessRes(res, { result });
};

module.exports = categories;
