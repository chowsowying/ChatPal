import React, { useRef } from "react";
import { AiFillFile } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addFiles } from "../../redux/chatSlice";
import { getFileType } from "../../utils/file";

const DocumemtAttachment = () => {
  //Redux
  const dispatch = useDispatch();

  //Ref
  const inputRef = useRef();

  // Handler: handle document
  const handleDocument = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      if (
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
          dispatch(addFiles({ file: file, type: getFileType(file.type) }));
        };
      }
    });
  };

  return (
    <li
      className="py-3 pl-5 cursor-pointer hover:bg-dark_bg_3 flex items-center gap-x-2"
      onClick={() => inputRef.current.click()}>
      <AiFillFile className="text-xl dark:text-dark_svg_1" />
      <span>Documents</span>
      <input
        type="file"
        hidden
        multiple
        ref={inputRef}
        accept="application/pdf,
        text/plain,
        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
        application/vnd.openxmlformats-officedocument.presentationml.presentation,
        application/vnd.ms-powerpoint,
        application/vnd.ms-excel,
        application/msword,
        application/vnd.rar,
        application/zip"
        onChange={handleDocument}
      />
    </li>
  );
};

export default DocumemtAttachment;
