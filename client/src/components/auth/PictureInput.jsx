import React, { useRef, useState } from "react";

const PictureInput = ({ previewPicture, setPicture, setPreviewPicture }) => {
  // States
  const [error, setError] = useState("");
  // Refs
  const inputRef = useRef();
  // Handlers: Handle picture preview
  const handlePicture = (e) => {
    let pic = e.target.files[0];
    if (pic.type !== "image/png" && pic.type !== "image/jpeg" && pic.type !== "image/webp") {
      setError("Only png, jpeg and webp files are allowed");
    } else if (pic.size > 1024 * 1024 * 5) {
      setError("Image size must be less than 5mb");
    } else {
      setError("");
      setPicture(pic);
      // Preview Picture
      const reader = new FileReader();
      reader.readAsDataURL(pic);
      reader.onloadend = (e) => {
        setPreviewPicture(e.target.result);
      };
    }
  };
  // Handlers: Handle change picture
  const handleRemovePicture = () => {
    setPicture("");
    setPreviewPicture("");
  };
  return (
    <div className="mt-8 content-center dark:text-dark_text_1 space-y-1">
      <label htmlFor="picture" className="text-sm font-bold tracking-wide">
        Picture
      </label>
      {previewPicture ? (
        <div className="flex flex-col items-center justify-center">
          <img src={previewPicture} alt="preview" className="w-32 h-32 object-cover rounded-full" />
          {/* Change Picture */}
          <div
            onClick={() => handleRemovePicture()}
            className="mt-2 w-20 py-1 text-sm dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer">
            Remove
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current.click()}
          className="w-full h-12 dark:bg-dark_bg_3 rounded-md font-bold flex items-center justify-center cursor-pointer">
          Upload Picture
        </div>
      )}
      <input
        type="file"
        name="picture"
        id="picture"
        className="hidden"
        ref={inputRef}
        accept="image/png,image/jpeg,image/webp"
        onChange={handlePicture}
      />
      {/* Error */}
      {error ? (
        <div className="mt-3">
          <p className="text-red-500 text-xs italic text-center">
            {error || "Something went wrong!"}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default PictureInput;
