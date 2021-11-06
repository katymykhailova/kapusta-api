const { Schema, model } = require('mongoose');
const yup = require('yup');

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const yupCategorySchema = yup.object({
  name: yup
    .string()
    .required('Обязательное поле')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Имя может состоять только из букв, апострофа, тире и пробелов.',
    ),
});

const Category = model('Category', categorySchema);

module.exports = {
  Category,
  yupCategorySchema,
};
