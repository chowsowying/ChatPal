import React, { useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addFiles } from "../../../redux/chatSlice";
import { getFileType } from "../../../utils/file";
import { BsPlus } from "react-icons/bs";

const AddMore = () => {
  //Redux
  const dispatch = useDispatch();
  //Ref
  const inputRef = useRef();
  // Handler: handle image
  const handleFile = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png" &&
        file.type !== "image/gif" &&
        file.type !== "image/webp" &&
        file.type !== "video/mp4" &&
        file.type !== "video/ogg" &&
        file.type !== "video/wav" &&
        file.type !== "video/mov" &&
        file.type !== "application/pdf" &&
        file.type !== "text/plain" &&
        file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
        file.type !== "application/vnd.ms-powerpoint" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !== "application/msword" &&
        file.type !== "application/vnd.rar" &&
        file.type !== "application/zip"
      ) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        files = files.filter((item) => item.name !== file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          dispatch(
            addFiles({ file: file, fileData: e.target.result, type: getFileType(file.type) })
          );
        };
      }
    });
  };
  return (
    <>
      <div
        onClick={() => inputRef.current.click()}
        className="w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer mt-5 flex items-center justify-center">
        <BsPlus size={24} className="dark:text-dark_svg_1" />
      </div>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/webp,application/*,text/plain"
        onChange={handleFile}
      />
    </>
  );
};

export default AddMore;
