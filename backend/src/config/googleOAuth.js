const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
  process.env.CLIENT_ID
);

module.exports = googleClient;