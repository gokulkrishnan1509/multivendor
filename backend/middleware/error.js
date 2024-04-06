const ErrorHandler = require("../utils/customError");

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || "Internal server Error";

  // wrong mongodb id error

  if (error.name === "CastError") {
    const message = `Resources not found with this id.. Invalid ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  //   Duplicate key error

  if (error.code === 11000) {
    const message = `Duplicate key ${Object.keys(error.keyValue)} Entered `;
    error = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (error.name === "JsonWebTokenError") {
    const message = `your url is invalid please try again later`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({ success: false, message: error.message });
};
