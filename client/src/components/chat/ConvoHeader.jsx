import { useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { getConversationId, getConversationName, getConversationPicture } from "../../utils/chat";

const ConvoHeader = ({ onlineUsers, setShowSidebar }) => {
  // Redux
  const { activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const conversationUserId = getConversationId(user, activeConversation.users);
  const isUserOnline = onlineUsers.some((user) => user.userId === conversationUserId);
  return (
    <div className="h-[80px] w-full dark:bg-dark_bg_2 flex items-center p-5  rounded-md">
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-row gap-x-3">
          {/* Pic */}
          <div className="flex items-center gap-x-5">
            <button onClick={() => setShowSidebar((prev) => !prev)} className="block lg:hidden ">
              <IoArrowBack className="text-xl dark:text-dark_svg_1" />
            </button>
            <div className="w-[40px] h-[40px] rounded-md overflow-hidden">
              <img
                src={getConversationPicture(user, activeConversation.users)}
                alt="profile pic"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <p className="dark:text-dark_text_1">
              {getConversationName(user, activeConversation.users)}
            </p>
            <p className="text-xs dark:text-dark_text_2 flex items-center">
              {isUserOnline ? (
                <>
                  <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                  Online
                </>
              ) : (
                <>
                  <span className="h-2 w-2 bg-gray-500 rounded-full mr-2"></span>
                  Offline
                </>
              )}
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-row gap-x-3">
          <button className="btn">
            <BiSearch className="text-xl dark:text-dark_svg_1" />
          </button>
          <button className="btn">
            <FiMoreVertical className="text-xl dark:text-dark_svg_1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvoHeader;
