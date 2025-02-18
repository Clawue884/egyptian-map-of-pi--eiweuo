const AWS = require("aws-sdk");

AWS.config.update({
  region: "me-south-1",
  credentials: new AWS.Credentials("AKIAXXXX", "SECRETXXXX"),
});

const locationService = new AWS.Location({
  apiVersion: "2020-11-19",
});

module.exports = { locationService };
