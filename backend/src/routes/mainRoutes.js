const express = require("express");
const router = express.Router();

const mediaRoutes = require("./mediaRoutes");
const userRoutes = require("./userRoutes");

router.use("/medias", mediaRoutes);
router.use("/user", userRoutes);

module.exports = router;