const express = require("express");
const router = express.Router();

const mediaRoutes = require("./mediaRoutes");
const userRoutes = require("./userRoutes");
const contactRoutes = require("./contact.routes");

router.use("/medias", mediaRoutes);
router.use("/user", userRoutes);
router.use("/contacts", contactRoutes);

module.exports = router;