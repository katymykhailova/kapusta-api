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

router.put(
  '/:transactionId',
  authenticate,
  validation(yupTransactionSchema),
  controllerWrapper(ctrl.updateTransaction),
);

router.delete(
  '/:transactionId',
  authenticate,
  controllerWrapper(ctrl.removeTransaction),
);

router.get('/', authenticate, controllerWrapper(ctrl.getTransactionsByMonth));

module.exports = router;
