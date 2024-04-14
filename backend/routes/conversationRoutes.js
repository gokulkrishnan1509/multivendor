module.exports = (app) => {
  const { isSeller } = require("../utils/auth");
  const ConversationController = require("../controller/conversationController");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const router = require("express").Router();
  const {
    createConversation,
    getConversation,
    updateMessage,
    conversationUserDetails,
  } = new ConversationController();

  router
    .route("/create-conversation")
    .post(asyncErrorHandler(createConversation));
  router
    .route("/get-shop-conversation")
    .get(isSeller, asyncErrorHandler(getConversation));

  router
    .route("/update-last-message/:id")
    .patch(asyncErrorHandler(updateMessage));

  router
    .route("/user-info/:id")
    .get(asyncErrorHandler(conversationUserDetails));
  app.use("/api/conversation", router);
};
