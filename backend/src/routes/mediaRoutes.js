const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {UploadImage, UpdateMedia, GetAllMedia, DeleteMedia} = require("../controllers/mediaController");

router.post("/upload", upload.single('image'), UploadImage);
router.put("/update/:id", upload.single('image'), UpdateMedia);
router.get("/", GetAllMedia);
router.delete("/delete/:id", DeleteMedia);

module.exports = router;

