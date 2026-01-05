const User = require("../../models/user");
const bcrypt = require("bcrypt");

const UserLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            const isPasswordValid = await bcrypt.compare(password, existingUser.password);

            if (!isPasswordValid) {
                return res.status(400).json({
                    "message": "wrong password"
                })
            }

            res.json({
                "message": "Login Successfull!"
            })
        }
        else {

            res.json({
                "message": "You don't have an account or wrong email"
            })
        }
    } catch (error) {
        res.status(500).json({
            "message": "Server Error",
            "error": error.message
        })
    }

}

module.exports = { UserLogin };