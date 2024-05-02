module.exports = (app) => {
  const { isSeller, isAuthenticated } = require("../utils/auth");
  const ConversationController = require("../controller/conversationController");
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");
  const router = require("express").Router();
  const {
    createConversation,
    getConversation,
    updateMessage,
    conversationUserDetails,
    getUserConversations,
    conversationShopDetails
  } = new ConversationController();

  router
    .route("/create-conversation")
    .post(asyncErrorHandler(createConversation));
  router
    .route("/get-shop-conversation")
    .get(isSeller, asyncErrorHandler(getConversation));

  router
    .route("/get-user-conversation")
    .get(isAuthenticated, getUserConversations);

  router
    .route("/update-last-message/:id")
    .patch(asyncErrorHandler(updateMessage));

  router
    .route("/user-info/:id")
    .get(asyncErrorHandler(conversationUserDetails));

  router.route("/shop-info/:id").get(asyncErrorHandler(conversationShopDetails))  

  app.use("/api/conversation", router);
};
