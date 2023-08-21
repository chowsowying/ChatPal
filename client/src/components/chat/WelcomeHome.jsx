import React from "react";
import { RiContactsFill } from "react-icons/ri";

const WelcomeHome = () => {
  return (
    <div className="h-full w-full dark:bg-dark_bg_4 border-b-[6px] border-b-green_2 rounded-md">
      {/* Container */}
      <div className="mt-2 w-full h-full flex flex-col items-center justify-center gap-y-8">
        {/* Icon */}
        <div className="text-9xl text-green_2">
          <RiContactsFill />
        </div>
        {/* Text */}
        <div className="text-center gap-y-2">
          <h1 className="text-2xl dark:text-dark_text_4 font-extralight">Welcome to ChatPal</h1>
          <p className="text-xl dark:text-dark_text_3 font-extralight">
            Select a conversation to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHome;
