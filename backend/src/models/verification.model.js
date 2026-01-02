const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    name: 
    { 
        type: String, 
        required: true 
    },
    email: 
    { 
        type: String, 
        required: true 
    },
    password: 
    { 
        type: String, 
        required: true 
    },
    role: 
    {
        type: String,
        default: "user"
    },
    otp: 
    { 
        type: String, 
        required: true 
    },
    createdAt: 
    { 
        type: Date, 
        default: Date.now, 
        expires: 300 // This record deletes itself automatically after 5 minutes!
    }
});

module.exports = mongoose.model('Verification', verificationSchema);