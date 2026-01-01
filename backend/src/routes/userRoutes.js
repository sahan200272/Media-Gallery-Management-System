const express = require("express");
const router = express.Router();

const {CreateUser} = require("../controllers/user_controllers/create_user.controller");
const {VerifyOTP} = require("../controllers/user_controllers/VerifyOTP.controller");

router.post("/create", CreateUser);
router.post("/verify", VerifyOTP);
// router.put("/update/:id", UpdateUser)

module.exports = router;