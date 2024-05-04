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

      const shop = await Shop.findById(req.seller._id)

      shop.availableBalance = shop.availableBalance - amount
      
      await shop.save({validateBeforeSave:false})

      res.status(201).json({ success: true });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }


async getAllWithdraw(req,res,next){
  try{
    const getAllRequest = await Withdraw.find().sort("-createdAt").select("-__v")

    res.status(200).json({getAllRequest,success:true})

  }catch(error){
    return next(new CustomError(error.message,500))
  }
}

}

module.exports = WithdrawController;
