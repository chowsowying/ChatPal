import React from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import PhotoAttachment from "./PhotoAttachment";
import DocumemtAttachment from "./DocumemtAttachment";

const Attachment = ({ showAttachment, setShowAttachment, setShowEmoji }) => {
  // Handle show attachment
  const handleShowAttachment = () => {
    setShowAttachment((prev) => !prev);
    setShowEmoji(false);
  };
  return (
    <li>
      <button onClick={handleShowAttachment} className="btn" type="button">
        <MdOutlineAttachFile className="text-xl dark:text-dark_svg_1" />
      </button>
      {/* Menu */}
      {showAttachment && (
        <div className="absolute bottom-[70px] z-50 dark:bg-dark_bg_1 dark:text-dark_text_1 shadow-md w-52 rounded-md">
          <ul>
            <PhotoAttachment />
            <DocumemtAttachment />
          </ul>
        </div>
      )}
    </li>
  );
};

export default Attachment;
