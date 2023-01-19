const { Router } = require('express');
const basicMiddlewares = require('../middlewares/basicMiddlewares');
const {contestController} = require('../controllers/index.js');
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');

const contestRouter = Router();

contestRouter.post(
  '/dataForContest',
  checkToken.checkToken,
  contestController.dataForContest
);

contestRouter.post(
  '/getCustomersContests',
  checkToken.checkToken,
  contestController.getCustomersContests
);

contestRouter.get(
  '/getContestById',
  checkToken.checkToken,
  basicMiddlewares.canGetContest,
  contestController.getContestById
);

contestRouter.post(
  '/getAllContests',
  checkToken.checkToken,
  basicMiddlewares.onlyForCreative,
  contestController.getContests
);

contestRouter.post(
  '/updateContest',
  checkToken.checkToken,
  upload.updateContestFile,
  contestController.updateContest
);

module.exports = contestRouter;
