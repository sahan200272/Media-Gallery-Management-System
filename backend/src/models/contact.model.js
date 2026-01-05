const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({

    name: {
        type: String
    },

    email: {
        type: String
    },

    message: {
        type: String
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId, // allow use to populate() method and take relevant user details to message
        ref: 'User'
    }
});

module.exports = mongoose.model("Contact", contactSchema);