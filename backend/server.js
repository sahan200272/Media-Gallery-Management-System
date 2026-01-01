const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")

const ConnectDB = require("./src/config/db");
const mainRoutes = require("./src/routes/mainRoutes");

dotenv.config();
const app = express();

// middlewares (between request and logic)
app.use(express.json());
app.use(cors());

app.use("/api", mainRoutes);

const PORT = process.env.PORT || 3000;

// connect DB and start app on PORT 5000 or 3000
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
});