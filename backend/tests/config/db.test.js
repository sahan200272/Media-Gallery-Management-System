const ConnectDB = require("../../src/config/db");
require('dotenv').config();
const mongoose = require("mongoose");

describe("Check mongodb connection", () => {

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("should connect to the database successfully", async() => {
        await expect(ConnectDB()).resolves.not.toThrow();
    });
 
})