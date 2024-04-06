
module.exports = (app) => {
    const { isSeller } = require("../utils/auth");
  const ConversationController = require("../controller/conversationController");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const router = require("express").Router();
  const { createConversation, getConversation } = new ConversationController();

  router
    .route("/create-conversation")
    .post(asyncErrorHandler(createConversation));
  router
    .route("/get-shop-conversation")
    .get(isSeller,asyncErrorHandler(getConversation));
  app.use("/api/conversation", router);
};
