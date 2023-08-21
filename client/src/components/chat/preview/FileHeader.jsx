import React from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearFiles } from "../../../redux/chatSlice";

const FileHeader = ({ active }) => {
  //Redux
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.chat);
  //Handle close
  const handleClose = () => {
    dispatch(clearFiles());
  };
  return (
    <div className="w-full p-5">
      {/* Container */}
      <div className="flex flex-row items-center justify-between">
        {/* Close Icon */}
        <div className="cursor-pointer" onClick={handleClose}>
          <MdClose size={24} className="dark:text-dark_svg_1" />
        </div>
        {/* File Name */}
        <h1 className="dark:text-dark_text_1 text-md">{files[active]?.file?.name}</h1>
        <div />
      </div>
    </div>
  );
};

export default FileHeader;
