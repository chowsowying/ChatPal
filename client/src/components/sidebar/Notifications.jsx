import React from "react";
import { IoMdNotificationsOff } from "react-icons/io";
import { MdClose } from "react-icons/md";

const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-3">
      {/* Container */}
      <div className="w-full flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-x-4">
          <div className="cursor-pointer">
            <IoMdNotificationsOff className=" text-3xl dark:text-blue_1 " />
          </div>
          <div className="flex flex-col">
            <span className="textPrimary">Get notified of new messages</span>
            <span className="textSecondary mt-0.5 flex items-center gap-0.5">
              Turn on desktop notifications
            </span>
          </div>
        </div>
        {/* Right */}
        <div className="cursor-pointer">
          <MdClose className="text-2xl dark:text-dark_svg_2" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
