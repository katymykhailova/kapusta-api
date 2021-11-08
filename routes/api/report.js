const express = require('express');
const router = express.Router();

const {
  controllerWrapper,
  // validation,
  authenticate,
} = require('../../middlewares');

const ctrl = require('../../controllers/report');

// ========================
console.log('in api/report');
// ========================
const print = () => console.log('hello');
router.get(
  '/',
  authenticate,
  // validation(yupTransactionSchema),
  // print,
  controllerWrapper(ctrl.getYearByMonthAndType),
);

module.exports = router;
