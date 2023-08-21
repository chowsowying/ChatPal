import React from "react";

const FileInput = ({ message, setMessage }) => {
  return (
    <div className="w-full max-w-[60%] dark:bg-dark_hover_1 rounded-lg mt-5">
      <input
        type="text"
        placeholder="Add a message"
        className="w-full p-2 dark:bg-dark_hover_1 dark:text-dark_text_1 rounded-lg focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </div>
  );
};

export default FileInput;
