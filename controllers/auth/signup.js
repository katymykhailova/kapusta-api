const bcryptjs = require('bcryptjs');
const { Conflict } = require('http-errors');
const { User } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Already register');
  }
  const hashPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
  const newUser = { username, email, password: hashPassword };
  const result = await User.create(newUser);

  sendSuccessRes(res, { result }, 201);
};

module.exports = signup;
