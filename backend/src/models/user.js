const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: 
    {
      type: String,
      required: true,
      trim: true
    },

    email: 
    {
      type: String,
      required: true,
      trim: true,
      lowercase:true
    },

    password: 
    {
      type: String,
      trim: true
    },

    googleId:
    {
      type: String,
      unique: true
    },

    avatar:{
      type: String
    },
    role: 
    {
      type: String,
      default: "user"
    },

    token:
    {
      type: String
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
