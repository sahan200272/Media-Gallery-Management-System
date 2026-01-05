const express = require("express");
const router = express.Router();

const {CreateContact} = require("../controllers/contacts_controllers/create_contact.controller");
const {EditContact} = require("../controllers/contacts_controllers/edit_contact.controller");

router.post("/send", CreateContact);
router.put("/update/:id", EditContact);

module.exports = router;