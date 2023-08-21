import React, { useEffect, useState } from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

const Emoji = ({ textRef, message, setMessage, showEmoji, setShowAttachment, setShowEmoji }) => {
  // State
  const [cursorPosition, setCursorPosition] = useState();

  // useEffect
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  // Handle Emoji Click
  const handleEmoji = (emojiData, ev) => {
    const { emoji } = emojiData;
    console.log("EmojiData", emojiData);
    const ref = textRef.current;
    ref.focus();
    const textStart = message.substring(0, ref.selectionStart); // 0 to cursor position
    const textEnd = message.substring(ref.selectionStart); // cursor position to end
    const newText = textStart + emoji + textEnd;
    setMessage(newText);
    setCursorPosition(textStart.length + emoji.length);
  };

  // Handle Show Emoji
  const handleShowEmoji = () => {
    setShowEmoji((prev) => !prev);
    setShowAttachment(false);
  };
  return (
    <li>
      <button className="btn" type="button" onClick={handleShowEmoji}>
        <BsFillEmojiSmileFill className="text-xl dark:text-dark_svg_1" />
      </button>
      {showEmoji && (
        <div className="absolute bottom-[70px]">
          <EmojiPicker theme="dark" onEmojiClick={handleEmoji} />
        </div>
      )}
    </li>
  );
};

export default Emoji;
