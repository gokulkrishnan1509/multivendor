const Event = require("../model/eventModel");
const Shop = require("../model/shopModel");
const CustomError = require("../utils/customError");

class EventController {
  async eventCreate(req, res, next) {
    try {
      const { _id } = req.seller;

      const shop = await Shop.findById(_id);


      if (!shop) {
        return next(new CustomError("Shop Id is invalid", 400));
      } else {
        // const files = req.files;
        // const imageUrls = files.map((file)=>`${file.filename}`);
        const eventData = req.body;
        eventData.shopId = _id;
        // eventData.images = imageUrls
        const storeEvent = await Event.create(eventData);

        res.status(201).json({ success: true, storeEvent });
      }
    } catch (error) {
      return next(new CustomError(error.message, 400));
    }
  }

  getAllEventShop = async (req, res, next) => {
    try {
      const { _id } = req.seller;
      const events = await Event.find({ shopId: _id });
      res.status(200).json({ success: true, events });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  deleteEvent = async function (req, res, next) {
    try {
      const { id } = req.params;
      const deletedEvent = await Event.findByIdAndDelete(id);



      if (!deletedEvent) {
        return next(new CustomError("Product not found with this id ", 404));
      }

      // const filename = req.file.filename;
      // const filePath = `uploads/${filename}`

      

      res.status(200).json({ deletedEvent, success: true });
    } catch (error) {
      return next(new CustomError(error.message, 400));
    }
  };
}

module.exports = EventController;
