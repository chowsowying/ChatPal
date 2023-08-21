import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { BsFillFileEarmarkFill } from "react-icons/bs";

const FileViewer = ({ active }) => {
  // Redux
  const { files } = useSelector((state) => state.chat);
  return (
    <div className="w-full max-w-[60%]">
      {/* Container */}
      <div className="flex justify-center items-center">
        {/* File Type */}
        {files[active]?.type === "IMAGE" ? (
          <img
            src={files[active]?.fileData}
            alt={files[active]?.file?.name}
            className="object-contain previewBody max-w-[80%]"
          />
        ) : files[active]?.type === "VIDEO" ? (
          <video
            src={files[active]?.fileData}
            alt={files[active]?.file?.name}
            className="object-contain previewBody max-w-[80%]"
            controls
          />
        ) : (
          <div className="flex flex-col justify-center items-center previewBody max-w-[80%]">
            <BsFillFileEarmarkFill className="text-[200px] dark:text-dark_svg_1 mb-5" />
            <h1 className="dark:text-dark_text_2 text-2xl">No Preview Available</h1>
            <span className="dark:text-dark_text_2">
              {files[active]?.file?.size} kB - {files[active]?.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileViewer;
