import React, { useEffect, useState } from "react";
import SideBar from "../components/sidebar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/chatSlice";
import WelcomeHome from "../components/chat/WelcomeHome";
import ConvoContainer from "../components/chat/ConvoContainer";
import SocketContext from "../context/socketContex";

function Home({ socket }) {
  // State
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  //Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { activeConversation } = useSelector((state) => state.chat);

  // Handle: Get user conversations
  const handleGetConversations = () => {
    if (user?.token) dispatch(getConversations(user.token));
  };

  // Handle: User join Socket.io
  const handleUserJoin = () => {
    if (user?.token) socket.emit("join", user._id);
  };

  // Handle: Get online users
  const handleGetOnlineUsers = () => {
    socket.on("onlineUsers", (users) => {
      console.log(users);
      setOnlineUsers(users);
    });
  };

  // Handle: User typing
  const handleUserTyping = () => {
    socket.on("typing", (conversationId) => {
      setTyping(true);
    });

    socket.on("stopTyping", (conversationId) => {
      setTyping(false);
    });
  };

  // UseEffects
  useEffect(() => {
    handleUserJoin();
    handleGetConversations();
  }, [user]);

  useEffect(() => {
    handleGetOnlineUsers();
    handleUserTyping();
  }, []);

  // Function to check screen size and update sidebar visibility
  const checkScreenSize = () => {
    if (window.innerWidth <= 1028) {
      // Adjust the screen width as needed
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  // Add an event listener to check the screen size when the component mounts
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      // Cleanup: remove the event listener when the component unmounts
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="h-screen dark:bg-dark_bg_1 p-5">
      {/* Container */}
      <div className="max-w-[1600px] mx-auto h-full flex gap-x-5">
        {showSidebar && (
          <div className="block">
            {" "}
            <SideBar onlineUsers={onlineUsers} />{" "}
          </div>
        )}
        {activeConversation._id ? (
          <ConvoContainer
            onlineUsers={onlineUsers}
            typing={typing}
            setShowSidebar={setShowSidebar}
          />
        ) : (
          <WelcomeHome />
        )}
      </div>
    </div>
  );
}

// Socket.io
const HomeWithSocket = (props) => (
  <SocketContext.Consumer>{(socket) => <Home {...props} socket={socket} />}</SocketContext.Consumer>
);

export default HomeWithSocket;
