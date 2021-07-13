const multer = require("multer");
const path = require("path");

const MulterUploader = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now());
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      req.isFileError = true;
      console.log("File not supported");
      cb(null, false);
      return;
    }
    cb(null, true);
  },
  onError: (err) => {
    console.log(err);
  },
});

module.exports = MulterUploader;
