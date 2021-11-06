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
    comment: {
      type: String,
      maxlength: 300,
    },
    amount: {
      type: Number,
      required: true,
    },
    // owner: {
    //   type: Schema.ObjectId,
    //   ref: 'user',
    // },
  },
  { versionKey: false, timestamps: true },
);

const Transaction = model('transaction', transactionSchema);

module.exports = {
  Transaction,
};
