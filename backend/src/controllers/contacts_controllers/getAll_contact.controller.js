const Contact = require("../../models/contact.model");

const getAllContacts = async (req, res) => {

    const contacts = await Contact.find();

    if(!contacts){
        return res.status(404).json({
            "message": "Data no exist"
        })
    }

    return res.status(200).json({
        "message" : "Data found",
        "contacts" : contacts
    })
}

module.exports = {getAllContacts};