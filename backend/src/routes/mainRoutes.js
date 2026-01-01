const express = require("express");
const router = express.Router();

const mediaRoutes = require("./mediaRoutes");

router.use("/medias", mediaRoutes);

module.exports = router;