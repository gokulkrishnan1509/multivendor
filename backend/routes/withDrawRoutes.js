module.exports = (app) => {
  const router = require("express").Router();
  const { isSeller, isAuthenticated, isAdmin } = require("../utils/auth");

  const WithdrawController = require("../controller/withdrawController");
  const { createWithDraw, getAllWithdraw, updateWithdraw } =
    new WithdrawController();

  router.route("/create-withdraw").post(isSeller, createWithDraw);
  router
    .route("/get-all-withdraw-request")
    .get(isAuthenticated, isAdmin("Admin"), getAllWithdraw);

  router
    .route("/update-withdraw-request/:id")
    .get(isAuthenticated, isAdmin("Admin"), updateWithdraw);

  app.use("/api/withdraw", router);
};
