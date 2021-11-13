const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const yupCategorySchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле'),
  type: yup.boolean().required('Обязательное поле'),
});

const Category = model('Category', categorySchema);

module.exports = {
  Category,
  yupCategorySchema,
};
