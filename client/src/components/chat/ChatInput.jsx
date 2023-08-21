import React, { useState } from "react";
import { useSelector } from "react-redux";
import SocketContext from "../../context/socketContex";

function ChatInput({ message, setMessage, textRef, socket }) {
  // State
  const [typing, setTyping] = useState(false);

  // Redux
  const { activeConversation } = useSelector((state) => state.chat);

  // Handle: Input Change
  const handleInputChange = (e) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation?._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 2000; // 2 seconds
    // If user stop typing for 2 seconds, emit stopTyping event
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stopTyping", activeConversation?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className="w-full h-full dark:bg-dark_bg_1 dark:text-dark_text_1 px-5 py-2 rounded-md outline-none"
        placeholder="Type a message"
        value={message}
        onChange={handleInputChange}
        ref={textRef}
      />
    </div>
  );
}

// Socket.io
const ChatInputWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatInput {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatInputWithSocket;
