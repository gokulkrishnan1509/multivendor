module.exports = (app) => {
  const router = require("express").Router();
  const { isAuthenticated, isAdmin } = require("../utils/auth");

  const {
    createNewUser,
    activation,
    login,
    loadUser,
    logOut,
    updateUSer,
    getUser,
    updateUSerAddress,
    deleteUSer,
    updatePassword,
    allUser,
  } = require("../controller/userController");
  const { uploadPhoto, userImgResize } = require("../utils/multer");
  // router.route("/user-upload").put(uploadPhoto.array("images", 1));

  router
    .route("/user-details")
    .post(uploadPhoto.array("images", 1), createNewUser);
  router.route("/user-activation").post(activation);
  router.route("/user-login").post(login);
  router.route("/getuser").get(isAuthenticated, loadUser);
  router.route("/logout").get(isAuthenticated, logOut);
  router.route("/patch-user").patch(isAuthenticated, updateUSer);
  router.route("/get-user").get(isAuthenticated, getUser);
  router.route("/update-address").patch(isAuthenticated, updateUSerAddress);
  router.route("/delete-user/:id").delete(isAuthenticated, deleteUSer);
  router.route("/update-password").patch(isAuthenticated, updatePassword);
  router.route("/get-all-user").get(isAuthenticated, isAdmin("Admin"), allUser);

  app.use("/api/user", router);
};
