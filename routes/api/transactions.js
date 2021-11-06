const express = require('express');
const router = express.Router();

const {
  controllerWrapper,
  // validation,
  authenticate,
} = require('../../middlewares');
const ctrl = require('../../controllers/transactions');

// router.get('/', authenticate, controllerWrapper(ctrl.Transactions));

// router.get('/:transactionId', authenticate, controllerWrapper(ctrl.getTransactionById));

router.post(
  '/',
  authenticate,
  // validation(yupTransactionSchema),
  controllerWrapper(ctrl.addTransaction),
);

// router.delete(
//   '/:transactionId',
//   authenticate,
//   controllerWrapper(ctrl.removeTransaction),
// );

// router.put(
//   '/:transactionId',
//   authenticate,
//   validation(yupTransactionSchema),
//   controllerWrapper(ctrl.updateTransaction),
// );

module.exports = router;
