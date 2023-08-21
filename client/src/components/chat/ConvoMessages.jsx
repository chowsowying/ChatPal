import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import TypingMessage from "./TypingMessage";
import FileMessage from "./FileMessage";

const ConvoMessages = ({ typing }) => {
  // Redux
  const { messages } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  // Ref
  const endRef = useRef();
  // useEffects
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" bg-cover bg-no-repeat ">
      {/* Container */}
      <div className="scrollbar convoMessages overflow-auto p-5">
        {/* Messages */}
        {messages &&
          messages.map((message) => (
            <>
              {/* Message Files */}
              {message.files.length > 0
                ? message.files.map((file) => (
                    <FileMessage
                      message={message}
                      file={file}
                      me={user._id === message.sender._id}
                      key={file._id}
                    />
                  ))
                : null}

              {/* Message Text */}
              {message.message.length > 0 ? (
                <Message message={message} me={user._id === message.sender._id} key={message._id} />
              ) : null}
            </>
          ))}
        <div ref={endRef}></div>
        {typing && <TypingMessage />}
      </div>
    </div>
  );
};

export default ConvoMessages;
