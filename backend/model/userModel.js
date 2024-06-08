 const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required field"],
    },
    password: {
      type: String,
      required: [true, "Password id required field"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required field"],
      unique: true,
    },
    avatar: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    address: [
      {
        country: {
          type: String,
        },
        city: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        zipCode: {
          type: Number,
        },
        addressType: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "Admin", "super admin"],
      default: "user",
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpired: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 14);
  next();
});

// jwt token


// compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// compare password

module.exports = mongoose.model("User", userSchema);
