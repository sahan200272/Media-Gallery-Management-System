const User = require("../../models/user");

const GetUserById = async (req, res) => {

    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (user) {

            return res.status(200).json({
                "message": "User Found",
                "User": user
            });
        }

        return res.status(404).json({
            "message": "User Not Found"
        });

    } catch (error) {

        console.error(error.message);

        return res.status(500).json({
            "message": "Server Error",
            "error": error.message
        });
    }
}

module.exports = {GetUserById};