const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your shop name!"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your shop email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLength: [6, "Password should be greate than 6 characters"],
      select: false,
    },
    address: {
      type: String,
      required: [true],
    },
    description: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: [true],
    },
    role: {
      type: String,
      default: "seller",
    },
    avatar: {
      type: String,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    withdrawMethod: {
      type: Object,
    },
    availableBalance:{type:Number,default:0},
    transections: [
      {
        amount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          default: "Processing",
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
        updatedAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 14);
  next();
});

shopSchema.methods.comparePassword = async function (psw, pswDB) {
  return await bcrypt.compare(psw, pswDB);
};
module.exports = mongoose.model("Shop", shopSchema);
