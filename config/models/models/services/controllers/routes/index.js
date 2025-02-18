const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbConfig");
const chatRoutes = require("./routes/chatRoutes");
const initSocket = require("./socket");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());

connectDB();

app.use("/api/chat", chatRoutes);

const server = http.createServer(app);
const io = initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT} ✅`);
});
