import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getConversationId } from "../../utils/chat";
import { open_create_conversation } from "../../redux/chatSlice";
import SocketContext from "../../context/socketContex";

function SearchResults({ searchResults, setShowSearchResults, setSearchResults, socket }) {
  // Redux
  const { conversations } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();

  // Handle Open Conversation
  const handleOpenConversation = async (convo) => {
    const values = { recieverId: convo._id, token };
    let res = await dispatch(open_create_conversation(values));
    setShowSearchResults(false);
    setSearchResults([]);
    // Socket.io
    socket.emit("joinConversation", res.payload._id);
  };

  return (
    <div className="convoContainer scrollbar overflow-y-scroll ">
      <div>
        {/* Heading */}
        <div className="flex flex-col">
          <h1 className="text-md text-green_2 pl-3">Contacts</h1>
          <span className="w-full mt-4 border-b dark:border-b-dark_border_2"></span>
        </div>
        {/* Results */}
        {searchResults &&
          searchResults.map((convo) => (
            <>
              <div
                key={convo?._id}
                onClick={() => handleOpenConversation(convo)}
                className="flex items-center justify-between p-3 w-full dark:bg-dark_bg_2 hover:dark:bg-dark_bg_1 rounded-md mb-1">
                {/* Convo Pic */}
                <div className="flex items-center">
                  <div className="w-[50px] h-[50px] rounded-md overflow-hidden">
                    <img
                      src={convo?.picture}
                      alt="profile pic"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-3">
                    <h1 className="font-bold dark:text-dark_text_1">{convo?.name}</h1>
                    <p className="text-sm dark:text-dark_text_2">{convo?.status}</p>
                  </div>
                </div>
              </div>
              <div className="border-b dark:border-dark_border_2"></div>
            </>
          ))}
      </div>
    </div>
  );
}

// Socket.io
const SearchResultsWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <SearchResults {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default SearchResultsWithSocket;
