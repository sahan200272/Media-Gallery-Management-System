const User = require("../../models/user");
const Verification = require("../../models/verification.model");
const bcrypt = require("bcrypt");

const ResetPassword = async(req, res) => {

    const {email, otp, newPassword} = req.body;

    try {
        // Validate input
        if(!email || !otp || !newPassword){
            return res.status(400).json({
                message: "Email, OTP, and new password are required"
            });
        }

        // Validate password strength
        if(newPassword.length < 6){
            return res.status(400).json({
                message: "Password must be at least 6 characters long"
            });
        }

        // Find verification record
        const verificationRecord = await Verification.findOne({email});

        if(!verificationRecord){
            return res.status(400).json({
                message: "OTP expired or invalid. Please request a new one."
            });
        }

        // Verify OTP
        if(verificationRecord.otp !== otp){
            return res.status(400).json({
                message: "Invalid OTP code."
            });
        }

        // Find the actual user
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        user.password = hashedPassword;
        await user.save();

        // Delete verification record
        await Verification.deleteOne({email});

        res.status(200).json({
            message: "Password reset successfully! You can now login with your new password."
        });

    } catch(error) {
        console.error(error.message);
        res.status(500).json({
            message: "Failed to reset password",
            error: error.message
        });
    }
}

module.exports = {ResetPassword};