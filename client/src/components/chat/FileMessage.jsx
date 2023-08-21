import React from "react";
import moment from "moment";

const FileMessage = ({ message, file, me }) => {
  console.log(file);
  // Handle download
  const handleDownload = () => {
    window.open(file.file.secure_url, "_blank");
  };

  return (
    <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`}>
      {/* Container */}
      <div
        onClick={handleDownload}
        className={`cursor-pointer relative h-full dark:text-dark_text_1 rounded-md p-2 ${
          me ? "bg-green_3" : "dark:bg-dark_bg_1"
        }`}>
        {/* image */}
        {file.type === "IMAGE" ? (
          <img
            src={file.file.secure_url}
            alt={file.file.name}
            className="object-contain w-40 h-40"
          />
        ) : file.type === "VIDEO" ? (
          <video
            src={file.file.secure_url}
            alt={file.file.name}
            className="object-contain w-40 h-40"
            controls
          />
        ) : (
          <div
            onClick={handleDownload}
            className="flex flex-col justify-center items-center w-40 h-40">
            <h1 className="dark:text-dark_text_2 text-md">No Preview Available</h1>
            <span className="dark:text-dark_text_2">
              {file.file.original_filename} - {file.type}
            </span>
          </div>
        )}

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

export default FileMessage;
