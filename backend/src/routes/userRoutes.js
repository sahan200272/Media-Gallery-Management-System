const express = require("express");
const router = express.Router();

const {CreateUser, UpdateUser} = require("../controllers/userController");

router.post("/create", CreateUser);
router.put("/update/:id", UpdateUser)

module.exports = router;