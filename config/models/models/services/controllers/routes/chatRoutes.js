const express = require("express");
const { sendChat, fetchChats } = require("../controllers/chatController");

const router = express.Router();

router.post("/send", sendChat);
router.get("/messages", fetchChats);

module.exports = router;
