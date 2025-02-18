const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const paymentRoutes = require("./routes/paymentRoutes");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
