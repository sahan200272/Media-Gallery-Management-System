const express = require("express");
const router = express.Router();

const {CreateUser} = require("../controllers/user_controllers/create_user.controller");
const {VerifyOTP} = require("../controllers/user_controllers/VerifyOTP.controller");
const {ForgotPassword} = require("../controllers/user_controllers/forgot_password.controller");
const {ResetPassword} = require("../controllers/user_controllers/reset_password.controller");

router.post("/create", CreateUser);
router.post("/verify", VerifyOTP);
router.post("/forgot", ForgotPassword);
router.post("/reset", ResetPassword);

// router.put("/update/:id", UpdateUser)

module.exports = router;