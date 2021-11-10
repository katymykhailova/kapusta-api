const express = require('express');
const router = express.Router();

const {
  controllerWrapper,
  // validation,
  authenticate,
} = require('../../middlewares');

const ctrl = require('../../controllers/report');

router.get(
  '/',
  authenticate,
  controllerWrapper(ctrl.getYearByMonthAndType),
);

module.exports = router;
