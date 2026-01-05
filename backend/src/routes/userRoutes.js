const express = require("express");
const router = express.Router();
const passport = require("passport");
const {generateToken} = require("../utils/jwt.util");

const {CreateUser} = require("../controllers/user_controllers/create_user.controller");
const {VerifyOTP} = require("../controllers/user_controllers/VerifyOTP.controller");
const {ForgotPassword} = require("../controllers/user_controllers/forgot_password.controller");
const {ResetPassword} = require("../controllers/user_controllers/reset_password.controller");
const {GetUserById} = require("../controllers/user_controllers/get_user_by_id");
const { UserLogin } = require("../controllers/user_controllers/user_login.controller");

router.post("/create", CreateUser);
router.post("/verify", VerifyOTP);
router.post("/forgot", ForgotPassword);
router.post("/reset", ResetPassword);
router.post("/login", UserLogin);

// Google OAuth routes (MUST be before /:id route)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    (req, res) => {
        try {
            const token = generateToken(req.user._id);
            // Redirect to frontend with token
            res.redirect(`http://localhost:5173?token=${token}`);
        } catch (error) {
            console.error("Google callback error:", error);
            res.redirect('http://localhost:5173/login?error=auth_failed');
        }
    });

// Parameterized routes MUST come last
router.get("/:id", GetUserById);

// router.put("/update/:id", UpdateUser)

module.exports = router;