module.exports = (app) => {
  const router = require("express").Router();
  const { uploadImges } = require("../controller/uploadfilesController");
  const { uploadPhoto,userImgResize } = require("../utils/multer");
  router.route("/user-upload").put(uploadPhoto.array("images", 1), uploadImges);

  app.use("/api/upload",router)
};
