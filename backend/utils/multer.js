const multer = require("multer");
// const sharp = require("sharp");

// path is inbuild nodemodules

const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported file format",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});

const userImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      // await sharp(file.path)
      //   .resize(300, 300)
      //   .toFormat("jpeg")
      // .toFile(`public/images/user${file.filename}`);

      // let newPath = `public/images/user/${file.filename}`;

      // req.userimage = newPath;
    })
  );

  // fs.rename(file.path, newPath, (err) => {
  //   if (err) {
  //     return next(err);
  //   }
  // });

  // req.imagePath = newPath;
  next();
};

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  //   await Promise.all(
  //     req.files.map(async (file) => {
  //       await sharp(file.path)
  //         .resize(300, 300)
  //         .toFormat("jpeg")
  //         .jpeg({ quality: 90 })
  //         .toFile(`public/images/products${file.filename}`);
  //     })
  //   );
  next();
};

module.exports = { uploadPhoto, productImgResize, userImgResize };
