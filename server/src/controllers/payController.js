const CONSTANTS = require("../constants");
const bd = require("../models");
const moment = require("moment");
const { v4: uuid } = require("uuid");
const userQueries = require("./queries/userQueries");
const bankQueries = require("./queries/bankQueries");

module.exports.payment = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    await bankQueries.updateBankBalance(
      {
        balance: bd.sequelize.literal(`
                CASE
            WHEN "cardNumber"='${req.body.number.replace(
              / /g,
              ""
            )}' AND "cvc"='${req.body.cvc}' AND "expiry"='${req.body.expiry}'
                THEN "balance"-${req.body.price}
            WHEN "cardNumber"='${CONSTANTS.SQUADHELP_BANK_NUMBER}' AND "cvc"='${
          CONSTANTS.SQUADHELP_BANK_CVC
        }' AND "expiry"='${CONSTANTS.SQUADHELP_BANK_EXPIRY}'
                THEN "balance"+${req.body.price} END
        `),
      },
      {
        cardNumber: {
          [bd.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ""),
          ],
        },
      },
      transaction
    );
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize =
        index === req.body.contests.length - 1
          ? Math.ceil(req.body.price / req.body.contests.length)
          : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? "active" : "pending",
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format("YYYY-MM-DD HH:mm"),
        prize,
      });
    });
    await bd.Contests.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  try {
    transaction = await bd.sequelize.transaction();
    const updatedUser = await userQueries.updateUser(
      { balance: bd.sequelize.literal("balance - " + req.body.sum) },
      req.tokenData.userId,
      transaction
    );
    await bankQueries.updateBankBalance(
      {
        balance: bd.sequelize.literal(`CASE 
                WHEN "cardNumber"='${req.body.number.replace(
                  / /g,
                  ""
                )}' AND "expiry"='${req.body.expiry}' AND "cvc"='${
          req.body.cvc
        }'
                    THEN "balance"+${req.body.sum}
                WHEN "cardNumber"='${
                  CONSTANTS.SQUADHELP_BANK_NUMBER
                }' AND "expiry"='${
          CONSTANTS.SQUADHELP_BANK_EXPIRY
        }' AND "cvc"='${CONSTANTS.SQUADHELP_BANK_CVC}'
                    THEN "balance"-${req.body.sum}
                 END
                `),
      },
      {
        cardNumber: {
          [bd.Sequelize.Op.in]: [
            CONSTANTS.SQUADHELP_BANK_NUMBER,
            req.body.number.replace(/ /g, ""),
          ],
        },
      },
      transaction
    );
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};
