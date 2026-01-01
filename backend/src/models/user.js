const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    name: String,
    email: { type: String, unique: true, required: true },
    avatar: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
