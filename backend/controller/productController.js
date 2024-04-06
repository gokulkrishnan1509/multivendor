const Product = require("../model/productModel");
const Shop = require("../model/shopModel");
const CustomError = require("../utils/customError");
const Order = require("../model/orderModel");

//create Product

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { _id } = req.seller;

      const shop = await Shop.findById(_id);
      if (!shop) {
        return next(new CustomError("Shop Id is invalid", 400));
      } else {
        const productData = req.body;
        productData.shop = shop;
        productData.shopId = _id;

        const product = await Product.create(productData);

        res.status(201).json({ success: true, product });
      }
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }

  getShopProduct = async (req, res, next) => {
    try {
      const { _id } = req.seller;
      const products = await Product.find({ shopId: _id });
      res.status(200).json({ success: true, products });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  getSellerProduct = async (req, res, next) => {
    try {
      const { id } = req.params;

      const products = await Product.find({ shopId: id });
      res.status(200).json({ success: true, products });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  getAllProduct = async (req, res, next) => {
    try {
      const products = await Product.find();

      res.status(200).json({ success: true, products });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  deleteProduct = async function (req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return next(new CustomError("Product not found with this id", 404));
      }

      res.status(200).json({ product, success: true });
    } catch (error) {
      return next(new CustomError(error.message, 400));
    }
  };

  productReview = async function (req, res, next) {
    try {
      const user = req.user;
      const { rating, comment, productId, orderId } = req.body;

      const review = {
        user,
        rating,
        comment,
        productId,
        created: new Date(),
      };

      const product = await Product.findById(productId);

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id.toString() === req.user._id.toString()
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id.toString() === req.user._id.toString()) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({ success: true, message: "Reviewed Successfully" });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };
}

module.exports = ProductController;
