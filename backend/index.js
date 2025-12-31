const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")

const ConnectDB = require("./src/config/db");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Express server is running');
});

const PORT = process.env.PORT || 3000;

ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
});