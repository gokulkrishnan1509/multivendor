const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your product name!"],
    },
    description: {
      type: String,
      required: [true, "Please enter your product description"],
    },
    category: {
      type: String,
      required: [true, "Please enter your product category"],
    },
    tags: {
      type: String,
      required: [true, "Please enter your product tags"],
    },
    originalPrice: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      required: [true, "Please enter you product price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter you product stock"],
    },
    images: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        productId: {
          type: String,
        },
        created:{
          type:Date
          // default:Date.now
        }
      },
    ],
    ratings: Number,
    shopId: {
      type: String,
      // required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
    sold_out: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
