const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv")

dotenv.config();
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running');
});

// Server port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});