const UserModel = require("../model/userModel");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const path = require("path");
const fs = require("fs");
const util = require("util");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const sendEmail = require("../utils/sendMail");
const { sendToken } = require("../utils/jwtToken");
const createActivationToken = (data) => {
  return jwt.sign({ data }, process.env.ACTIVATION_SECERET, {
    expiresIn: "5m",
  });
};

exports.createNewUser = asyncErrorHandler(async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return next(new CustomError("User already exist", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    const token = createActivationToken(user);

    const activationUrl = `http://localhost:5174/activation/${token}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}.please click on the link to activate your account:${activationUrl}`,
      });
      return res.status(200).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account`,
      });
    } catch (error) {
      return next(new CustomError(error.message, 500));
    }

    // res.status(200).json({ userData });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

exports.activation = asyncErrorHandler(async (req, res, next) => {
  try {
    const { activation_token } = req.body;

    const newUser = await util.promisify(jwt.verify)(
      activation_token,
      process.env.ACTIVATION_SECERET
    );

    if (!newUser) {
      return next(new CustomError("Invalid token", 400));
    }

    const { name, email, password } = newUser?.data;

    let user = await UserModel.findOne({ email });
    if (user) {
      return next(new CustomError("User already exist", 400));
    }

    user = await UserModel.create({ name, email, password });
    return await sendToken(user, 201, res);
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

// login user

exports.login = asyncErrorHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new CustomError("Please provide email & password for login ", 400)
      );
    }
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new CustomError("Given account is not exist", 400));
    }
    const isMatch = await user.comparePassword(password, user.password);

    if (!user || !isMatch) {
      return next(new CustomError("incorrect email or password", 400));
    }

    return sendToken(user, 200, res);
  } catch (error) {
    return next(new CustomError(error.message, 400));
  }
});

const filterReqObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((prop) => {
    if (allowedFields.includes(prop)) newObj[prop] = obj[prop];
  });

  return newObj;
};

exports.updateUSer = asyncErrorHandler(async (req, res, next) => {
  const { _id } = req.user;
  const filterObj = filterReqObj(req.body, "name", "email", "phoneNumber");
  try {
    const user = await UserModel.findByIdAndUpdate(_id, filterObj, {
      runValidators: true,
      new: true,
    });

    res.status(200).json({ message: "User profile updated" });
  } catch (error) {
    return next(new CustomError(error.message, 400));
  }
});

// load user

exports.loadUser = asyncErrorHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return next(new CustomError("User doesn't exists", 400));
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

// log out User

exports.logOut = asyncErrorHandler(async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(201).json({ success: true, message: "Log out SuccessFully" });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

exports.updateUserImage = asyncErrorHandler(async (req, res, next) => {
  try {
    const existsUser = await UserModel.findById(req.user._id);
    if (existsUser.avatar === undefined) {
      const fileUrl = path.join(req.file.filename);

      user = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          avatar: fileUrl,
        },
        { new: true }
      );
    } else {
      // const existAvatarPath = `../public/${existsUser.avatar}`;
      // fs.unlinkSync(existAvatarPath);
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

exports.getUser = asyncErrorHandler(async (req, res, next) => {
  try {
    const existUser = await UserModel.findById(req.user._id);

    res.status(200).json({ success: true, existUser });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

exports.updateUSerAddress = asyncErrorHandler(async (req, res, next) => {
  try {
    let user = await UserModel.findById(req.user._id);
    const sameTypeAddress = user.address.find(
      (address) => address.addressType === req.body.addressType
    );

    if (sameTypeAddress) {
      return next(
        new CustomError(`${req.body.addressType} address already exists`)
      );
    }

    const existAddress = user.address.find(
      (address) => address._id === req.body._id
    );

    if (existAddress) {
      Object.assign(existAddress, req.body);
    } else {
      user.address.push(req.body);
    }

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

exports.deleteUSer = asyncErrorHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;

    await UserModel.updateOne(
      { _id: userId },
      { $pull: { address: { _id: addressId } } }
    );

    const user = await UserModel.findById(userId);

    res.status(200).json({ success: true, user });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new CustomError("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new CustomError("Password not matched with each other!", 400)
      );
    }

    user.password = req.body.newPassword;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return next(new CustomError(error.message, 500));
  }
});

exports.allUser = asyncErrorHandler(async (req, res, next) => {
  try {
    const allUser = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, allUser });
  } catch (error) {
    return next(new CustomError("Something went wrong", 500));
  }
});
