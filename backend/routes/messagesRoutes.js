module.exports = (app) => {
  const router = require("express").Router();
  const { isAuthenticated } = require("../utils/auth");
  const { uploadPhoto } = require("../utils/multer");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");

  const MessageController = require("../controller/messageController");

  const { createMessages } = new MessageController();

  router
    .route("/create-message")
    .post(uploadPhoto.array("images"), asyncErrorHandler(createMessages));

  app.use("/api/message", router);
};
