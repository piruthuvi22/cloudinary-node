const router = require("express").Router();
const cloudinary = require("../Cloudinary/cloudinary");
const MulterUploader = require("../multerEngine/engine");

const User = require("../Modal/modal");

// upload the file with name of "profile-img"
router.post("/", MulterUploader.single("profile-img"), async (req, res) => {
  if (req.file !== undefined) {
    // Save user with profile picture
    try {
      // upload the file
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: req.file.filename,
        use_filename: true,
      });
      console.log(result);
      const USER = new User({
        Username: req.body.Username,
        cloudinaryID: result.public_id,
        cloudinaryURL: result.secure_url,
      });
      await USER.save();
      res.json(USER);
    } catch (error) {
      res.json(error);
    }
  } else {
    // Save user without profile picture
    try {
      const USER = new User({
        Username: req.body.Username,
      });
      await USER.save();
      res.json(USER);
    } catch (error) {
      res.send(error);
    }
  }
});

router.delete("/", async (req, res) => {
  try {
    // public_id be like this > "profile-img-1626153373071"
    const public_id = req.body.public_id;
    // Remove the file with the cloudinary_id. see the example below
    await cloudinary.uploader.destroy(public_id);

    res.json("File deleted");
  } catch (error) {
    res.json(error);
  }
});
module.exports = router;
