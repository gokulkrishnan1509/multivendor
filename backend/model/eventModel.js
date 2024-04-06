const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your event product name"],
    },
    description: {
      type: String,
      required: [true, "Please enter your event product  desciption"],
    },
    category: {
      type: String,
      required: [true, "Please enter your event product category"],
    },
    start_Date: {
      type: Date,
      required: true,
    },
    Finish_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Running",
    },
    originalPrice: {
      type: Number,
    },
    stock:{
      type:Number,
      // required:[true,"Please enter your event product price"]
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter your event product stock!"],
    },
    images: [{ type: String }],
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);


module.exports= mongoose.model("Event",eventSchema)