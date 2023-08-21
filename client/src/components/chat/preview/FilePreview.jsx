import React, { useState } from "react";
import FileHeader from "./FileHeader";
import FileViewer from "./FileViewer";
import FileInput from "./FileInput";
import FileUpload from "./FileUpload";

const FilePreview = () => {
  // State
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(0);
  return (
    <div className="relative py-2 w-full fflex items-cnter justify-center">
      {/* Container */}
      <div className="w-full flex flex-col items-center">
        {/* Header */}
        <FileHeader active={active} />
        {/* Body */}
        <FileViewer active={active} />
        {/* Message Input */}
        <div className="w-full flex flex-col items-center">
          <FileInput message={message} setMessage={setMessage} />
          <FileUpload active={active} setActive={setActive} message={message} />
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
