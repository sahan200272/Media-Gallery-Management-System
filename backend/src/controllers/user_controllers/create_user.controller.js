const User = require("../../models/user");
const bcrypt = require("bcrypt");
const sendOTP = require("../../utils/sendEmail");

const CreateUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        //console.log(req.body);

        const user = await User.findOne({ email });

        if (user) {

            res.status(400).json({
                message: "An account already exist"
            });

        } else {

            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await sendOTP(email, otp);

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            const response = newUser.save();

            if (response) {
                res.status(200).json({
                    message: "New user created"
                })
            }
        }

    }catch(error){
        console.error(error.message);
        res.status(500).json({
            message: "Server Error",
            error: error.message
        })
    }

}

module.exports = { CreateUser };