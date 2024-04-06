const { isSeller } = require("../utils/auth");

module.exports = (app) => {
  const asyncErrorHandler = require("../middleware/asyncErrorHandler");

  const EventController = require("../controller/eventController");

  const { eventCreate, getAllEventShop, deleteEvent } = new EventController();
  const router = require("express").Router();

  router.route("/event-post").post(isSeller, asyncErrorHandler(eventCreate));
  router
    .route("/getshop-event")
    .get(isSeller, asyncErrorHandler(getAllEventShop));
  router
    .route("/deleteshop-event/:id")
    .delete(isSeller, asyncErrorHandler(deleteEvent));

  app.use("/api/event", router);
};
