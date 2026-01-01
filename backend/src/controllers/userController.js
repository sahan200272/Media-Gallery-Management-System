const User = require("../models/user");
const bcrypt = require("bcrypt")

const CreateUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser) {

            res.status(400).json({
                message: "User already exist"
            });

        } else {

            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                email: email,
                password: hashedPassword
            })

            const resData = await newUser.save();

            res.status(200).json({
                message: "User creat successful",
                user: resData
            });
        }

    } catch (error) {

        res.status(500).json({
            message: "User create failed",
            error: error.message
        })
    }
}



module.exports = { CreateUser, UpdateUser };