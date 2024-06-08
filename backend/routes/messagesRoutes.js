module.exports = (app) => {
  const router = require("express").Router();
  const { isAuthenticated } = require("../utils/auth");
  const { uploadPhoto } = require("../utils/multer");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");

  const MessageController = require("../controller/messageController");

  const { createMessages, getAllMessageWithConversationId } =
    new MessageController();

  router
    .route("/create-message")
    .post(uploadPhoto.single("images"), asyncErrorHandler(createMessages));

  router
    .route("/getAllMessage/:id")
    .get(asyncErrorHandler(getAllMessageWithConversationId));
  app.use("/api/message", router);
};
