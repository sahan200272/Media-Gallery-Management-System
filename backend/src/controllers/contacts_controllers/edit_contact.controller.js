const Contact = require("../../models/contact.model");

const EditContact = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, email, message } = req.body;

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                "message": "The contact does not exist"
            })
        }

        contact.name = name || contact.name;
        contact.email = email || contact.email;
        contact.message = message || contact.message;

        const updatedContact = await contact.save();

        return res.status(200).json({
            "message" : "Contact update success",
            "updateContact" : contact
        })
    } catch (error) {

        return res.status(500).json({
            "message" : "Server error",
            "error" : error.message
        })
    }


}

module.exports = { EditContact };