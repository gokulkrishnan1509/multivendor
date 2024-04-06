const { isSeller } = require("../utils/auth");

module.exports = (app) => {
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const CouponController = require("../controller/couponController");
  const { CouponCreate, getCoupon, getCouponByName } = new CouponController();
  const router = require("express").Router();

  router.route("/coupon-post").post(isSeller, asyncErrorHandler(CouponCreate));
  router.route("/get-coupon").get(isSeller, asyncErrorHandler(getCoupon));
  router
    .route("/get-coupon-name/:name")
    .get(asyncErrorHandler(getCouponByName));

  app.use("/api/coupon", router);
};
