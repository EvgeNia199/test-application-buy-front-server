const { Router } = require("express");
const {
  authRouter,
  chatRouter,
  contestRouter,
  payRouter,
  userRouter,
} = require("./routes/index.js");

const router = Router();

router.use("/auth", authRouter);

router.use("/contests", contestRouter);

router.use("/chat", chatRouter);

router.use("/payOrder", payRouter);

router.use("/user", userRouter);

module.exports = router;
