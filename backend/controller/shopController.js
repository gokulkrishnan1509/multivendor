const ShopModel = require("../model/shopModel");
const CustomError = require("../utils/customError");
const path = require("path");
const fs = require("fs");
const util = require("util");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const { sendShopToken } = require("../utils/jwtToken");
const shopModel = require("../model/shopModel");

const createActivationToken = (data) => {
  return jwt.sign({ data }, process.env.ACTIVATION_SECERET, {
    expiresIn: "5m",
  });
};

class Shop {
  createNewShop = async (req, res, next) => {
    try {
      const { name, email, password, address, phone, zipcode } = req.body;

      const shopEmail = await ShopModel.findOne({ email });

      if (shopEmail) {
        return next(new CustomError("User already exist", 400));
      }
      const shopuser = {
        name: name,
        email: email,
        password: password,
        address: address,
        phoneNumber: phone,
        zipCode: zipcode,
      };
      const shop = await shopModel.create(shopuser);

      res.status(200).json({ shop });

      // const token = createActivationToken(shopuser);
      // console.log(token)

      // const activationUrl = `http://localhost:5173/seller-activation/${token}`;

      // try {
      //   await sendEmail({
      //     email: shopuser.email,
      //     subject: "Activate your account",
      //     message: `Hello ${shopuser.name}. please click o the link to activate your account:${activationUrl}`,
      //   });
      //   return res.status(200).json({
      //     success: true,
      //     message: `Please check you email ${shopuser.email} to activate your account`,
      //   });
      // } catch (error) {
      //   return next(new CustomError(error.message), 500);
      // }
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  };

  async activation(req, res, next) {
    try {
      const { activation_token } = req.body;
      const newUser = await util.promisify(jwt.verify)(
        activation_token,
        process.env.ACTIVATION_SECERET
      );

      if (!newUser) {
        return next(new CustomError("Invalid token", 400));
      }

      const { name, email, password, address, phoneNumber, zipCode } =
        newUser?.data;

      let user = await ShopModel.findOne({ email });

      if (user) {
        return next(new CustomError("User already exist", 400));
      }

      user = await ShopModel.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        zipCode,
      });
      return await sendShopToken(user, 201, res);
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }

  login = async function (req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          new CustomError("Please provide email & password for login", 400)
        );
      }

      const user = await ShopModel.findOne({ email }).select("+password");
      const isMatch = await user.comparePassword(password, user.password);

      if (!user || !isMatch) {
        return next(new CustomError("Incorrect email or password", 400));
      }

      return await sendShopToken(user, 200, res);
    } catch (error) {
      return next(new CustomError(error.message, 400));
    }
  };

  async loadUser(req, res, next) {
    try {
      const user = await ShopModel.findById(req.seller._id);
      if (!user) {
        return next(new CustomError("User doesn't exists", 400));
      }
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  }

  updateShopAvatar = async function (req, res, next) {
    try {
      let existShop = await ShopModel.findById(req.seller._id);

      let user;
      if (existShop) {
        if (existShop.avatar === undefined) {
          const fileUrl = path.join(req.file.filename);

          user = await ShopModel.findByIdAndUpdate(
            req.seller._id,
            { avatar: fileUrl },
            { new: true }
          );
        } else {
          const existAvatarPath = `public/${existShop.avatar}`;
          // const existAvatarPath = path.join(__dirname, '..', 'public', existShop.avatar);

          fs.unlinkSync(existAvatarPath);

          const fileUrl = path.join(req.file.filename);

          user = await ShopModel.findByIdAndUpdate(
            req.seller._id,
            { avatar: fileUrl },
            { new: true }
          );
        }
      }
      res.status(200).json({ user });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  logOut = async (req, res, next) => {
    try {
      res.cookie("user_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({ success: true, message: "Log out SuccessFully" });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };

  filterReqObj =  (obj, ...allowedFields) =>{
    const newObj = {};

    Object.keys(obj).forEach((prop) => {
      if (allowedFields.includes(prop)) newObj[prop] = obj[prop];
    });

    return newObj;
  };

  updateShop = async  (req, res, next) =>{
    const { _id } = req.seller;


    const filterObj = this.filterReqObj(
      req.body,
      "name",
      "description",
      "address",
      "phoneNumber",
      "zipCode"
    );

    try {
      
      await ShopModel.findByIdAndUpdate(_id, filterObj, {
        runValidators: true,
        new: true,
      });

      res.status(200).json({ message: "Profile updated" });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }
  };
}

module.exports = Shop;
