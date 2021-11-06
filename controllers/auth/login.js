const bcryptjs = require('bcryptjs');
const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');
const { sendSuccessRes } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, '_id email password');
  if (!user || !bcryptjs.compareSync(password, user.password)) {
    throw new Unauthorized('Email or password is wrong');
  }
  const { _id } = user;
  const payload = {
    _id,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(_id, { token });
  sendSuccessRes(res, { token }, 201);
};

module.exports = login;
