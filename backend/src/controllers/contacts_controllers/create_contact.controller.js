const Contact = require("../../models/contact.model");

const CreateContact = async (req, res) => {

    try {
        const {name, email, message} = req.body;

        if(!req.body){
            return res.status(404).json({
                "message": "The req.body is empty"
            })
        }

        const newContact = new Contact({
            "name": name,
            "email": email,
            "message": message
        });

        const response = await newContact.save();

        return res.status(200).json({
            "message": "Message Saved",
            "contact": response
        })
    } catch (error) {
        res.status(500).json({
            "message": "Server Error",
            "error": error.message
        })
    }
}

module.exports = {CreateContact};