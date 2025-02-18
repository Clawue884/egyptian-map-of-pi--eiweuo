const socketIo = require("socket.io");
const Chat = require("./models/chatModel");

const initSocket = (server) => {
  const io = socketIo(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinRoom", ({ userId }) => {
      socket.join(userId);
    });

    socket.on("sendMessage", async ({ sender, receiver, message }) => {
      const chat = new Chat({ sender, receiver, message });
      await chat.save();

      io.to(receiver).emit("receiveMessage", chat);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = initSocket;
