const nodemailer = require("nodemailer");
require("dotenv").config();

const sendOTP = async (email, otp) => {
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

    await transporter.sendMail({
        from: `"Your App Name" <${MY_EMIAL_PW}>`,
        to: email,
        subject: "Your Verification Code",
        text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });
};

module.exports = sendOTP;