const mongoose = require("mongoose");

const user = mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },
  cloudinaryID: {
    type: String,
    required: true,
    default: "User-Profile-PNG-Image_o4q8si.png",
  },
  cloudinaryURL: {
    type: String,
    required: true,
    default: process.env.DEFAULT_USER_PIC,
  },
});

module.exports = mongoose.model("User", user);
