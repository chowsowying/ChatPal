import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillFileEarmarkFill } from "react-icons/bs";
import AddMore from "./AddMore";
import { BsSendFill } from "react-icons/bs";
import { uploadFiles } from "../../../utils/upload";
import { clearFiles, sendMessage, removeSelectedFile } from "../../../redux/chatSlice";
import SocketContext from "../../../context/socketContex";
import ClipLoader from "react-spinners/ClipLoader";

function FileUpload({ setActive, active, message, socket }) {
  // State
  const [loading, setLoading] = useState(false);
  // Redux
  const { files, activeConversation } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const dispatch = useDispatch();
  // Handle Send
  const handleSend = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    // upload files
    const uploadedFiles = await uploadFiles(files);
    // send message
    const data = {
      token,
      message,
      convoId: activeConversation._id,
      files: uploadedFiles.length > 0 ? uploadedFiles : null,
    };
    let res = await dispatch(sendMessage(data));
    socket.emit("sendMessage", res.payload);
    setLoading(false);
    // clear files and message on send
    dispatch(clearFiles());
  };
  // Handle Remove File
  const handleRemoveFile = (index) => {
    dispatch(removeSelectedFile(index));
  };
  return (
    <div className="w-[97%] mt-5 border-t dark:border-dark_border_2">
      {/* Empty */}
      <div />
      {/* List Files */}
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2">
          {files.map((file, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`relative w-14 h-14 border dark:border-white rounded-md overflow-hidden cursor-pointer mt-5 ${
                active === index ? " border-[3px] !border-green_1" : ""
              }`}>
              {file.type === "IMAGE" ? (
                <img src={file.fileData} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="m-2">
                  <BsFillFileEarmarkFill className=" w-full h-full dark:text-dark_svg_1" />
                </div>
              )}
              {/* Remove Icon */}
              <div
                onClick={() => handleRemoveFile(index)}
                className="absolute top-0 right-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs cursor-pointer hover:bg-red-700">
                x
              </div>
            </div>
          ))}
          {/* Add files button */}
          <AddMore setActive={setActive} />
        </div>
        {/* Send Button */}
        <div
          onClick={(e) => handleSend(e)}
          className="bg-green_1 w-14 h-14 mt-2 rounded-full flex items-center justify-center cursor-pointer">
          {loading ? (
            <ClipLoader color={"#fff"} size={20} />
          ) : (
            <BsSendFill className="text-white text-2xl" />
          )}
        </div>
      </div>
    </div>
  );
}

// Socket.io
const FileUploadWithSocket = (props) => (
  <SocketContext.Consumer>
    {(socket) => <FileUpload {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default FileUploadWithSocket;
