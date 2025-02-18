require("dotenv").config();
const PiNetwork = require("@pinetwork-js/sdk");

PiNetwork.init({
  appId: process.env.PI_APP_ID,
  sandbox: false, // Set true jika dalam mode pengujian
});

module.exports = { PiNetwork };
