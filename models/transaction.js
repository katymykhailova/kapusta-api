const { Schema, model } = require('mongoose');
const yup = require('yup');

const CATEGORIES = {
  FOOD: 'food',
  CAR: 'car',
  DEVELOPMENT: 'development',
  KIDS: 'kids',
  HOME: 'home',
};

const transactionSchema = Schema(
  {
    type: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: Object.values(CATEGORIES),
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      maxlength: 300,
    },
    owner: {
      type: Schema.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true },
);

const yupTransactionSchema = yup.object({
  amount: yup.number().required('Обязательное поле'),
  description: yup.string().required('Обязательное поле'),
  date: yup.date().required('Обязательное поле'),
  type: yup.boolean().required('Обязательное поле'),
});

const Transaction = model('transaction', transactionSchema);

module.exports = {
  yupTransactionSchema,
  Transaction,
};
