import React, { useRef } from "react";
import { AiFillCamera } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addFiles } from "../../redux/chatSlice";
import { getFileType } from "../../utils/file";

const PhotoAttachment = () => {
  //Redux
  const dispatch = useDispatch();
  //Ref
  const inputRef = useRef();
  // Handler: handle image
  const handleImage = (e) => {
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
        file.type !== "video/mov"
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
    <li
      className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3 flex items-center gap-x-2"
      onClick={() => inputRef.current.click()}>
      <AiFillCamera className="text-xl dark:text-dark_svg_1" />
      <span>Photo</span>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="image/png,image/jpeg,image/gif,image/webp"
        onChange={handleImage}
      />
    </li>
  );
};

export default PhotoAttachment;
