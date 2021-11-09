const express = require('express');
const router = express.Router();

const {
  controllerWrapper,
  // validation,
  authenticate,
} = require('../../middlewares');

const ctrl = require('../../controllers/expenses');

// router.get(
//   '/',
//   authenticate,
//   // validation(yupTransactionSchema),
//   controllerWrapper(ctrl.getYearByMonthAndType),
// );
router.get(
  '/',
  authenticate,
  // validation(yupTransactionSchema),
  controllerWrapper(ctrl.monthDetalReport),
);

module.exports = router;
