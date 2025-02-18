import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const ChatComponent = ({ userId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinRoom", { userId });

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [userId]);

  const sendMessage = () => {
    socket.emit("sendMessage", { sender: userId, receiver: "targetUserId", message });
    setMessage("");
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.message}</li>
        ))}
      </ul>
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Kirim</button>
    </div>
  );
};

export default ChatComponent;
