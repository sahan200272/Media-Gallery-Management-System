const nodemailer = require("nodemailer");
require("dotenv").config();

const sendOTP = async (email, otp, isPasswordReset = false) => {
    const { MY_EMAIL, MY_EMIAL_PW } = process.env;

    if (!MY_EMAIL || !MY_EMIAL_PW) {
        throw new Error("Email credentials missing. Set EMAIL_USER and EMAIL_PASS env vars.");
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MY_EMAIL,
            pass: MY_EMIAL_PW,
        },
    });

    const subject = isPasswordReset 
        ? "Password Reset Code" 
        : "Your Verification Code";
    
    const text = isPasswordReset
        ? `Your password reset OTP is ${otp}. It expires in 5 minutes. If you didn't request this, please ignore this email.`
        : `Your OTP is ${otp}. It expires in 5 minutes.`;

    await transporter.sendMail({
        from: `"Your App Name" <${MY_EMAIL}>`,
        to: email,
        subject: subject,
        text: text,
    });
};

module.exports = sendOTP;