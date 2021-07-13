const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../Cloudinary/cloudinary");
const upload = require("../multerEngine/engine");

const User = require("../Modal/modal");

router.post("/", upload.single("quiz"), async (req, res) => {
  if (req.file !== undefined) {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
        use_filename: true,
        transformation: [{ gravity: "auto", crop: "fill" }],
      });
      console.log(result);
      const USER = new User({
        userID: req.body.userID,
        userName: req.body.userName,
        cloudinaryID: result.public_id,
        cloudinaryURL: result.secure_url,
      });
      await USER.save();
      res.json(USER);
    } catch (error) {
      res.send(error);
    }
  } else {
    try {
      const USER = new User({
        userID: req.body.userID,
        userName: req.body.userName,
      });
      await USER.save();
      res.json(USER);
    } catch (error) {
      res.send(error);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.body.userID });
    res.json(user);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", upload.single("quiz"), async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.body.userID });
    console.log(user);
    const cloudinary_id = user.cloudinaryID;
    await cloudinary.uploader.destroy(cloudinary_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: req.file.filename,
      use_filename: true,
    });

    user.cloudinaryID = result.public_id;
    user.cloudinaryURL = result.secure_url;
    const res = await user.save();
    res.json(res);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
