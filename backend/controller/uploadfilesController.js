const path = require("path");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const UserModel = require("../model/userModel");
const fs = require("fs");


exports.uploadImges = asyncErrorHandler(async (req, res) => {
  const files = req.files;
  const urls = [];

  for (let i = 0; i < files.length; i++) {
    const { filename } = files[i];
    const fileUrl = path.join(filename)
    urls.push(fileUrl);
  }

  const image = urls.map((file) => {
    return {userimage:file};
  });

  

  res.status(200).json({ image });
});
