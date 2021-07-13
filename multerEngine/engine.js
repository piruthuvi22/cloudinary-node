const multer = require("multer");
const path = require("path");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     let ext = file.originalname.split(".").pop();
//     cb(null, file.fieldname + "-" + Date.now() + "." + ext);
//   },
// });

// const upload = multer({ storage: storage });
// module.exports = upload;

module.exports = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    console.log("extension = ", ext);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
