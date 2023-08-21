import React from "react";

const TypingMessage = () => {
  return (
    <div className="w-full flex mt-2 space-x-3 max-w-xs">
      {/* Container */}
      <div className="relative h-full dark:text-dark_text_1 rounded-md p-2 dark:bg-dark_bg_1">
        {/* Message */}
        <p className="text-center text-sm ">Typing...</p>
        {/* Message Tip */}
        <div className="absolute w-3 h-3 bottom-1.5 -left-1.5 dark:bg-dark_bg_1 transform rotate-45" />
      </div>
    </div>
  );
};

export default TypingMessage;
