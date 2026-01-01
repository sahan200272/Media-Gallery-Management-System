const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title:
  {
    type: String,
    required: true
  },
  description:
  {
    type: String,
    required: true
  },
  tags:[String], // because of array we not use key value pairs like (type:String)
  images: [
    {
      imageUrl:
      {
        type: String,
        required: true
      },
      publicId:
      {
        type: String,
        required: true
      },
    } // Needed to delete from Cloudinary later
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', MediaSchema);