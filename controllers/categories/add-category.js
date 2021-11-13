const { sendSuccessRes } = require('../../helpers');
const { Category } = require('../../models');
const { Conflict } = require('http-errors');

const addCategory = async (req, res) => {
  const { name } = req.body;
  const includedCategory = await Category.find({ name });
  console.log(includedCategory);

  if (includedCategory.length > 0) {
    throw new Conflict('Category already exist');
  }

  const result = await Category.create({ ...req.body });
  sendSuccessRes(res, { result }, 201);
};

module.exports = addCategory;
