const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

// Load environment variables FIRST before requiring passport
dotenv.config();

// Now require passport config (it needs env variables)
require("./src/config/passport");

const ConnectDB = require("./src/config/db");
const mainRoutes = require("./src/routes/mainRoutes");

const app = express();

// middlewares (between request and logic)
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/api", mainRoutes);

const PORT = process.env.PORT || 3000;

// connect DB and start app on PORT 5000 or 3000
ConnectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
});