import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HiUserGroup } from "react-icons/hi";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FiMoreVertical } from "react-icons/fi";
import { RxUpdate } from "react-icons/rx";
import Menu from "./Menu";

const SideBarHeader = () => {
  // State
  const [showMenu, setShowMenu] = useState(false);
  // Redux
  const { user } = useSelector((state) => state.user);

  return (
    <div className="h-[80px] w-full dark:bg-dark_bg_2 flex items-center p-5 mb-5 rounded-md">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex flex-row gap-x-3">
          <div className="w-[40px] h-[40px] rounded-md overflow-hidden">
            <img src={user?.picture} alt="profile pic" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <p className="dark:text-dark_text_1">{user?.name}</p>
            <p className="text-xs dark:text-dark_text_2">
              {/* Green circle */}
              <span className="w-[10px] h-[10px] rounded-full bg-green-500 inline-block mr-1"></span>
              Active Now
            </p>
          </div>
        </div>
        {/* Right */}
        <div className="relative">
          <button
            className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}
            onClick={() => setShowMenu((prev) => !prev)}>
            <FiMoreVertical className="text-xl dark:text-dark_svg_1" />
          </button>
          {showMenu ? <Menu /> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBarHeader;
