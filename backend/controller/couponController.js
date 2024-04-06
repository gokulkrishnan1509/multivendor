const Coupon = require("../model/couponCodeModel");
const Shop = require("../model/shopModel");
const CustomError = require("../utils/customError");

class CouponController {
  async CouponCreate(req, res, next) {
    try {
      const { _id } = req.seller;
      const couponExist = await Coupon.findOne({ name: req.body.name });

      if (couponExist) {
        return next(new CustomError("Coupon code already exists!", 409));
      }
      const couponCreate = await Coupon.create({ ...req.body, shopId: _id });

      res.status(201).json({ success: true, couponCreate });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }

  async getCoupon(req, res, next) {
    const { _id } = req.seller;

    try {
      const couponCodes = await Coupon.find({ shopId: _id });

      res.status(200).json({ success: true, couponCodes });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  }

  async getCouponByName(req, res, next) {
    try {
      const couponeCode = await Coupon.findOne({ name: req.params.name });
      res.status(200).json({ success: true, couponeCode });
    } catch (error) {
      next(new CustomError(error.message, 400));
    }
  }
}

module.exports = CouponController;
