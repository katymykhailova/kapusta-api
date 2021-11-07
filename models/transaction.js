const { Schema, model } = require('mongoose');
const yup = require('yup');

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
      type: Schema.ObjectId,
      ref: 'category',
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
  amount: yup
    .number()
    .required('Обязательное поле')
    .positive('Только положительное число'),
  description: yup.string().required('Обязательное поле'),
  date: yup.date().required('Обязательное поле'),
  type: yup.boolean().required('Обязательное поле'),
});

const Transaction = model('transaction', transactionSchema);

module.exports = {
  yupTransactionSchema,
  Transaction,
};
