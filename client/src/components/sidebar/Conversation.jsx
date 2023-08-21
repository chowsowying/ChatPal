import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { formatDate } from "../../utils/date";
import { useDispatch } from "react-redux";
import { getConversationId, getConversationName, getConversationPicture } from "../../utils/chat";
import { open_create_conversation } from "../../redux/chatSlice";
import SocketContext from "../../context/socketContex";

function Conversation({ socket, onlineUsers }) {
  // Redux
  const { conversations, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();

  // Handle Open Conversation
  const handleOpenConversation = async (convo) => {
    const values = { recieverId: getConversationId(user, convo.users), token };
    let res = await dispatch(open_create_conversation(values));
    // Socket.io
    socket.emit("joinConversation", res.payload._id);
  };

  return (
    <div className="convoContainer scrollbar overflow-y-scroll">
      {conversations &&
        conversations
          .filter((convo) => convo?.latestMessage || convo?._id === activeConversation._id)
          .map((convo, index) => (
            <>
              <div
                key={convo._id}
                onClick={() => handleOpenConversation(convo)}
                className={`flex items-center justify-between p-3 w-full  cursor-pointer border-b dark:border-dark_border_2 ${
                  convo._id === activeConversation._id
                    ? "dark:bg-dark_bg_1"
                    : " dark:bg-dark_bg_2 hover:dark:bg-dark_bg_1"
                }`}>
                {/* Convo Pic */}
                <div className="flex items-center">
                  <div className=" w-[50px] h-[50px] rounded-md overflow-hidden">
                    <img
                      src={getConversationPicture(user, convo.users)}
                      alt="profile pic"
                      className={`w-full h-full object-cover ${
                        onlineUsers.some((u) => u.userId === getConversationId(user, convo.users))
                          ? "border-2 border-green_2"
                          : ""
                      }`}
                    />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-bold dark:text-dark_text_1">
                      {getConversationName(user, convo.users)}
                    </h1>
                    <p className="text-sm dark:text-dark_text_2">
                      {convo?.latestMessage?.message?.length > 20
                        ? `${convo.latestMessage.message.slice(0, 20)}...`
                        : convo?.latestMessage?.message || "Start a conversation"}
                    </p>
                  </div>
                </div>
                {/* Convo Time */}
                <div className="flex flex-col items-end text-xs">
                  <span className="dark:text-dark_text_2">
                    {convo?.latestMessage?.createdAt
                      ? formatDate(convo.latestMessage.createdAt)
                      : ""}
                  </span>
                </div>
              </div>
            </>
          ))}
    </div>
  );
}

// Socket.io
const ConversationWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithSocket;
