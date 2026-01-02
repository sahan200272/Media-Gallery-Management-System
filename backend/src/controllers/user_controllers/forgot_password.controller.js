const User = require("../../models/user");
const Verification = require("../../models/verification.model");
const sendOTP = require("../../utils/sendEmail");

const ForgotPassword = async(req, res) => {

    const {email} = req.body;
    
    try{     

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).json({
                message: "No account found with this email address"
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Send OTP email with password reset flag
        await sendOTP(email, otp);

        // Delete any existing verification record for this email
        await Verification.deleteOne({email});

        // Create new verification record
        const tempUser = new Verification({
            name: existingUser.name,
            email: existingUser.email,
            password: existingUser.password,
            role: existingUser.role,
            otp: otp
        });

        await tempUser.save();

        res.status(200).json({
            message: "Password reset OTP sent to your email. Valid for 5 minutes."
        });

    }catch(error){
        console.error(error.message);
        res.status(500).json({
            message: "Failed to send reset code",
            error: error.message
        });
    }
}

module.exports = {ForgotPassword};