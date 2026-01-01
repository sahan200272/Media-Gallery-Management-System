const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const {UploadImage, UpdateMedia, GetAllMedia, DeleteMedia} = require("../controllers/mediaController");

router.post("/upload", upload.array('images'), UploadImage);
router.put("/update/:id", upload.array('images'), UpdateMedia);
router.get("/", GetAllMedia);
router.delete("/delete/:id", DeleteMedia);

module.exports = router;

