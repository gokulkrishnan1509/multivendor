const Shop = require("../model/shopModel");
const CustomError = require("../utils/customError");
const express = require("express");
const Withdraw = require("../model/withDrawModel");
const sendMail = require("../utils/sendMail");

class WithdrawController {
  async createWithDraw(req, res, next) {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      try {
        await sendMail({
          email: req.seller.email,
          subject: "withdraw Request",
          message: `Hello ${req.seller.name}, your withdraw request on ${amount}$ is processing. it will take 3days to 7days to processing! `,
        });

        res
          .status(200)
          .json({ success: true, message: `Please check your email` });
      } catch (error) {
        return next(new CustomError(error.message, 500));
      }

      await Withdraw.create(data);

      const shop = await Shop.findById(req.seller._id);

      shop.availableBalance = shop.availableBalance - amount;

      await shop.save({ validateBeforeSave: false });

      res.status(201).json({ success: true });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }

  async getAllWithdraw(req, res, next) {
    try {
      const getAllRequest = await Withdraw.find()
        .sort("-createdAt")
        .select("-__v");

      res.status(200).json({ allWithdraw: getAllRequest, success: true });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }

  async updateWithdraw(req, res, next) {
    try {
      const { sellerId } = req.body;

      const withdraw = await Withdraw.findByIdAndUpdate(
        req.params.id,
        { status: "succeed", updatedAt: Date.now() },
        { new: true }
      );

      const seller = await Shop.findById(sellerId)

      const transection ={
        _id:withdraw._id,
        amount:withdraw.amount,
        updatedAt:withdraw.updatedAt,
        status:withdraw.status,

      }

      seller.transections =[...seller.transections,transection]


      await seller.save({validateBeforeSave:false})


      // bank information not matching with your name
      try{
        await sendMail({
          email:seller.email,
          subject:"payment confirmation",
          message:`Hello  ${seller.name}, your withdraw request  of ${withdraw.amount} is on the way. Delivery time depends on your bank's rules it usually takes 3days to 7days`
        })
      }catch(error){
        next(new CustomError(error.message,500))
      }


      res.status(201).json({success:true,withdraw})

    } catch (error) {
      return next(new CustomError(error.message,500))
    }
  }
}

module.exports = WithdrawController;
