const Chat = require("../models/chatModel");

const sendMessage = async (sender, receiver, message) => {
  const chat = new Chat({ sender, receiver, message });
  return await chat.save();
};

const getMessages = async (user1, user2) => {
  return await Chat.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 },
    ],
  }).sort({ timestamp: 1 });
};

module.exports = { sendMessage, getMessages };
