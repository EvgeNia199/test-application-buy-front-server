const { Router } = require('express');
const {authController} = require('./../controllers/index.js');
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');
const authRouter = Router();

authRouter.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  authController.registration
);

authRouter.post('/login', validators.validateLogin, authController.login);

module.exports = authRouter;
