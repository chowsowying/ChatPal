import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SocketContext from "../../context/socketContex";
import { updateMessageAndConvo } from "../../redux/chatSlice";
import { getConversationMessages } from "../../redux/chatSlice";
import ConvoHeader from "./ConvoHeader";
import ConvoMessages from "./ConvoMessages";
import ChatActions from "./ChatActions";
import FilePreview from "./preview/FilePreview";

function ConvoContainer({ socket, onlineUsers, typing, setShowSidebar }) {
  // Redux
  const { activeConversation, files } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();

  // Handle: Listen for new messages
  const handleNewMessage = () => {
    if (socket.connected) {
      console.log("Socket is connected");
      socket.on("receiveMessage", (message) => {
        dispatch(updateMessageAndConvo(message));
      });
    } else {
      console.log("Socket is not connected");
    }
  };

  useEffect(() => {
    handleNewMessage();
  }, []);

  // useEffects
  useEffect(() => {
    if (activeConversation._id) {
      const values = {
        token,
        convoId: activeConversation?._id,
      };
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);

  return (
    <div className="relative h-full w-full dark:bg-dark_bg_4 border-b-[6px] border-b-green_2 rounded-md">
      {/* Container */}
      <div>
        {/* Header */}
        <ConvoHeader onlineUsers={onlineUsers} setShowSidebar={setShowSidebar} />
        <>
          {files.length > 0 ? (
            <FilePreview />
          ) : (
            <>
              {/* Messages */}
              <ConvoMessages typing={typing} />
              {/* Chat Actions */}
              <ChatActions />
            </>
          )}
        </>
      </div>
    </div>
  );
}

// Socket.io
const ConvoContainerWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <ConvoContainer {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConvoContainerWithSocket;
