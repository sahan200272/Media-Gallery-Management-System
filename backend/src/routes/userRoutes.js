const express = require("express");
const router = express.Router();

const {CreateUser} = require("../controllers/user_controllers/create_user.controller");

router.post("/create", CreateUser);
// router.put("/update/:id", UpdateUser)

module.exports = router;