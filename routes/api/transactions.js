const express = require('express');
const router = express.Router();

const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');
const ctrl = require('../../controllers/transactions');
const { yupTransactionSchema } = require('../../models/transaction');

router.post(
  '/',
  authenticate,
  validation(yupTransactionSchema),
  controllerWrapper(ctrl.addTransaction),
);

router.delete(
  '/:transactionId',
  authenticate,
  controllerWrapper(ctrl.removeTransaction),
);

router.put(
  '/:transactionId',
  authenticate,
  validation(yupTransactionSchema),
  controllerWrapper(ctrl.updateTransaction),
);

router.get(
  '/',
  authenticate,
  // validation(),
  controllerWrapper(ctrl.getTransactionsByMonth),
);

module.exports = router;
