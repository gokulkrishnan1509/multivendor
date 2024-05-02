const ErrorHandler = require("./customError");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const ShopModel = require("../model/shopModel");

const util = require("util");
const CustomError = require("./customError");

exports.isAuthenticated = asyncErrorHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.SECERET_STRING
  );
  req.user = await UserModel.findById(decoded.id);

  next();
});

exports.isSeller = asyncErrorHandler(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = await util.promisify(jwt.verify)(
    seller_token,
    process.env.SECERET_STRING
  );

  const user = await ShopModel.findById(decoded.id);
  //  console.log(user)

  req.seller = user;

  next();
});

exports.isAdmin = (...roles) => {
  const deterMinedroles = new Set(roles);
  return (req, res, next) => {
    if (deterMinedroles.has(req.user.role)) {
      next();
    } else {
      return next(
        new CustomError(
          `${req.user.name} you don't permission to perform this action`,
          403
        )
      );
    }
  };
};
