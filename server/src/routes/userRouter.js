const { Router } = require('express');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const {userController} = require('../controllers/index.js');
const userRouter = Router();

userRouter.post('/getUser', checkToken.checkAuth);

userRouter.get(
  '/downloadFile/:fileName',
  checkToken.checkToken,
  userController.downloadFile
);

userRouter.post(
  '/setNewOffer',
  checkToken.checkToken,
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  userController.setNewOffer
);

userRouter.post(
  '/setOfferStatus',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  userController.setOfferStatus
);

userRouter.post(
  '/changeMark',
  checkToken.checkToken,
  basicMiddlewares.onlyForCustomer,
  userController.changeMark
);

userRouter.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser
);

module.exports = userRouter;
