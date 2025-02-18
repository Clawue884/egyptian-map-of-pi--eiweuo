const { sendMessage, getMessages } = require("../services/chatService");

const sendChat = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const chat = await sendMessage(sender, receiver, message);
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchChats = async (req, res) => {
  try {
    const { user1, user2 } = req.query;
    const chats = await getMessages(user1, user2);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendChat, fetchChats };
