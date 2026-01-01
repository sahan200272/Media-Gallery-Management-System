const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {UploadImage, UpdateMedia} = require("../controllers/mediaController");

router.post("/upload", upload.single('image'), UploadImage);
router.put("/update/:id", upload.single('image'), UpdateMedia);

module.exports = router;

