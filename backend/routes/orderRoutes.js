const { isAuthenticated, isSeller, isAdmin } = require("../utils/auth");

module.exports = (app) => {
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const OrderController = require("../controller/orderController");

  const {
    createOrder,
    getUserOrder,
    getShopOrder,
    updateOrderStatus,
    giveRefund,
    acceptTheRefund,
    adminOrders
  } = new OrderController();
  const router = require("express").Router();
  router
    .route("/order-routes")
    .post(isAuthenticated, asyncErrorHandler(createOrder));

  router
    .route("/order-users")
    .get(isAuthenticated, asyncErrorHandler(getUserOrder));

  router.route("/order-shop").get(isSeller, asyncErrorHandler(getShopOrder));
  router
    .route("/order-update/:id")
    .patch(isSeller, asyncErrorHandler(updateOrderStatus));

  router.route("/order-refund/:id").patch(asyncErrorHandler(giveRefund));

  router
    .route("/order-refund-success/:id")
    .patch(isSeller, asyncErrorHandler(acceptTheRefund));

  router.route("/admin-orders").get(isAuthenticated,isAdmin("Admin"),asyncErrorHandler(adminOrders))

  app.use("/api/order", router);
};
