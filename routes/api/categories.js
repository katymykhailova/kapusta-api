const express = require('express');
const router = express.Router();
const { yupCategorySchema } = require('../../models/category');

const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const ctrl = require('../../controllers/categories');

router.get('/', authenticate, ctrl.getAllCategories);
router.post(
  '/',
  authenticate,
  validation(yupCategorySchema),
  controllerWrapper(ctrl.addCategory),
);

module.exports = router;
