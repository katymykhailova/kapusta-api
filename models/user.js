const { Schema, model } = require('mongoose');
const yup = require('yup');
const gr = require('gravatar');

const userSchema = Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: function () {
        return gr.url(this.email, { s: '250' }, true);
      },
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true },
);

const yupUserSchema = yup.object({
  username: yup.string(),
  email: yup.string().email().required('Это обязательное поле'),
  password: yup.string().required('Это обязательное поле'),
});

const User = model('user', userSchema);

module.exports = { User, yupUserSchema };
