module.exports = (app) => {
  const Shop = require("../controller/shopController");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const router = require("express").Router();
  const { uploadPhoto, userImgResize } = require("../utils/multer");
  const {
    createNewShop,
    loadUser,
    logOut,
    login,
    activation,
    updateShopAvatar,
    updateShop,
    getAllShop,
    updatePaymentMethod,
    deleteWithDraw,
  } = new Shop();
  const { isSeller, isAuthenticated, isAdmin } = require("../utils/auth");
  router.route("/create-shop").post(asyncErrorHandler(createNewShop));
  router.route("/logout").post(asyncErrorHandler(logOut));
  router.route("/load-shop").get(isSeller, asyncErrorHandler(loadUser));
  router.route("/login").post(asyncErrorHandler(login));
  router.route("/activation").post(asyncErrorHandler(activation));
  router
    .route("/update-shop-avatar")
    .patch(
      isSeller,
      uploadPhoto.single("image"),
      asyncErrorHandler(updateShopAvatar)
    );

  router.route("/update-payment-methods").put(isSeller, updatePaymentMethod);
  router
    .route("/get-all-shop")
    .get(isAuthenticated, isAdmin("Admin"), getAllShop);

  router.route("/update-shop").patch(isSeller, asyncErrorHandler(updateShop));
  router
    .route("/delete-withdraw-method")
    .patch(isSeller, asyncErrorHandler(deleteWithDraw));
  app.use("/api/shop", router);
};
