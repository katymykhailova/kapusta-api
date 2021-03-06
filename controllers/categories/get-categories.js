const { sendSuccessRes } = require('../../helpers');
const { Category } = require('../../models');

const categories = async (req, res) => {
  const result = await Category.find({}, '_id name type');
  sendSuccessRes(res, { result });
};

module.exports = categories;
