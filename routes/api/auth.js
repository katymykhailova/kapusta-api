const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/auth');
const {
  googleAuth,
  googleRedirect,
} = require('../../controllers/auth/googleAuth');
const { yupUserSchema } = require('../../models/user');
const {
  controllerWrapper,
  validation,
  authenticate,
} = require('../../middlewares');

router.post(
  '/signup',
  validation(yupUserSchema),
  controllerWrapper(ctrl.signup),
);
router.post('/login', validation(yupUserSchema), controllerWrapper(ctrl.login));
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));

router.get('/google', controllerWrapper(googleAuth));

router.get('/google-redirect', controllerWrapper(googleRedirect));

module.exports = router;
