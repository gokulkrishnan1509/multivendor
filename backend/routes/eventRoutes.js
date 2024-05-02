const { isSeller, isAdmin, isAuthenticated } = require("../utils/auth");

module.exports = (app) => {
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");

  const EventController = require("../controller/eventController");

  const { eventCreate, getAllEventShop, deleteEvent, getAllEvent } =
    new EventController();
  const router = require("express").Router();

  router.route("/event-post").post(isSeller, asyncErrorHandler(eventCreate));
  router
    .route("/getshop-event")
    .get(isSeller, asyncErrorHandler(getAllEventShop));
  router
    .route("/deleteshop-event/:id")
    .delete(isSeller, asyncErrorHandler(deleteEvent));

  router
    .route("/get-all-event")
    .get(isAuthenticated, isAdmin("Admin"), asyncErrorHandler(getAllEvent));
  app.use("/api/event", router);
};
