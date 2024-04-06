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
  } = new Shop();
  const { isSeller } = require("../utils/auth");
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

  router.route("/update-shop").patch(isSeller, asyncErrorHandler(updateShop));
  app.use("/api/shop", router);
};
