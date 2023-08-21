import React from "react";
import moment from "moment";

const Message = ({ message, me }) => {
  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}>
      {/* Container */}
      <div
        className={`relative h-full dark:text-dark_text_1 rounded-md p-2 ${
          me ? "bg-green_3" : "dark:bg-dark_bg_1"
        }`}>
        {/* Message */}
        <p className="float-left text-sm pb-4 pr-8">{message?.message}</p>
        {/* Time */}
        <p className=" absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5">
          {moment(message?.createdAt).format("HH:mm")}
        </p>
        {/* Message Tip */}
        <div
          className={`absolute w-3 h-3 bottom-1.5 ${
            me ? "-right-1.5 bg-green_3" : "-left-1.5 dark:bg-dark_bg_1"
          } transform rotate-45`}
        />
      </div>
    </div>
  );
};

export default Message;
