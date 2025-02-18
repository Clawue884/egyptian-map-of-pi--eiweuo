const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { getNearbyMerchants, getAddress, searchPlace, convertAddressToCoords } = require("./controllers/locationController");

const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/petapi", { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/nearby-merchants", getNearbyMerchants);
app.get("/get-address", getAddress);
app.get("/search-place", searchPlace);
app.post("/convert-address", convertAddressToCoords);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
