import React, { useState, useRef } from "react";
import { BsSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/chatSlice";
import SocketContext from "../../context/socketContex";
import { ClipLoader } from "react-spinners";
import Emoji from "./Emoji";
import Attachment from "./Attachment";
import ChatInput from "./ChatInput";

function ChatActions({ socket }) {
  // State
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachment, setShowAttachment] = useState(false);
  const [loading, setLoading] = useState(false);
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation, status } = useSelector((state) => state.chat);
  const { token } = user;
  // Ref
  const textRef = useRef();

  // Handle: Send Message
  const handleSendMessage = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const values = {
      token,
      convoId: activeConversation?._id,
      message,
      files: [],
    };
    let res = await dispatch(sendMessage(values));
    setMessage("");
    setLoading(false);
    // Socket.io
    socket.emit("sendMessage", res.payload);
  };
  return (
    <form
      className="w-full h-[70px]  absolute bottom-2 px-5 py-2 flex items-center "
      onSubmit={(ev) => handleSendMessage(ev)}>
      {/* Container */}
      <div className="w-full h-full flex items-center dark:bg-dark_bg_1  rounded-md ">
        {/* Emoji and Attachment */}
        <ul className="flex ">
          <Emoji
            textRef={textRef}
            message={message}
            setMessage={setMessage}
            showEmoji={showEmoji}
            setShowEmoji={setShowEmoji}
            setShowAttachment={setShowAttachment}
          />
          <Attachment
            showAttachment={showAttachment}
            setShowEmoji={setShowEmoji}
            setShowAttachment={setShowAttachment}
          />
        </ul>
        {/* Input */}
        <ChatInput message={message} setMessage={setMessage} textRef={textRef} />
        {/* Send Button */}
        <button className="btn" type="submit">
          {status === "loading" && loading ? (
            <ClipLoader color="#fff" size={20} />
          ) : (
            <BsSendFill className="dark:text-dark_svg_1" />
          )}
        </button>
      </div>
    </form>
  );
}

// Socket.io
const ChatActionsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ChatActionsWithSocket;
