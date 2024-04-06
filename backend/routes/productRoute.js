module.exports = (app) => {
  const ProductController = require("../controller/productController");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const router = require("express").Router();
  const {
    createProduct,
    getShopProduct,
    deleteProduct,
    getAllProduct,
    productReview,
    getSellerProduct
  } = new ProductController();
  const { isSeller, isAuthenticated } = require("../utils/auth");

  router
    .route("/create-product")
    .post(isSeller, asyncErrorHandler(createProduct));
  router
    .route("/get-shop-product")
    .get(isSeller, asyncErrorHandler(getShopProduct));
  router.route("/get-product").get(asyncErrorHandler(getAllProduct));

  router.route("/get-seller-product/:id").get(asyncErrorHandler(getSellerProduct))

  router
    .route("/delete-product/:id")
    .delete(isSeller, asyncErrorHandler(deleteProduct));

  router.route("/rating-product").patch(isAuthenticated, productReview);

  app.use("/api/product", router);
};
