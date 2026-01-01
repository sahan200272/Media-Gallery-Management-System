const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {UploadImage} = require("../controllers/mediaController");

router.post("/upload", upload.single('image'), UploadImage);

module.exports = router;

