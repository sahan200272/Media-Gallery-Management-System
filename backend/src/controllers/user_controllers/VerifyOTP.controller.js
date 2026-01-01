const User = require("../../models/user");
const Verification = require("../../models/verification.model");

const VerifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the temporary record
        const tempUser = await Verification.findOne({ email });

        if (!tempUser) {
            return res.status(400).json(
                {
                    message: "OTP expired or invalid"
                });
        }

        // Check if OTP matches
        if (tempUser.otp !== otp) {
            return res.status(400).json(
                {
                    message: "Wrong OTP code."
                });
        }

        // Create the REAL user now that they are verified
        const newUser = new User({
            name: tempUser.name,
            email: tempUser.email,
            password: tempUser.password
        });

        await newUser.save();

        // Delete the temporary record so it can't be reused
        await Verification.deleteOne({ email });

        res.status(201).json(
            {
                message: "User verified and created successfully!"
            });

    } catch (error) {
        res.status(500).json(
            {
                message: "Verification failed", error: error.message
            });
    }
};

module.exports = {VerifyOTP};