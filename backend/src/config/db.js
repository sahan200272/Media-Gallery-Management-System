const mongoose = require("mongoose");

const ConnectDB = async() => {

    try{

        mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connection successful!");

    }catch(error){

        console.error(`MongoDB connection failed : ${error.message}`);
    }
}

module.exports = ConnectDB;