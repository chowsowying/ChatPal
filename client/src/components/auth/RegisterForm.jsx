import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useSelector, useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../redux/userSlice";
import PictureInput from "./PictureInput";
import axios from "axios";
import { DarkModeToastSuccess } from "../../utils/CustomToast";

// env
const cloud_name = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

const RegisterForm = () => {
  // State
  const [picture, setPicture] = useState();
  const [previewPicture, setPreviewPicture] = useState("");
  // Navigate
  const navigate = useNavigate();
  // Redux
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  // Destructure useForm
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  // Handlers: Handle Submit
  const onSubmit = async (data) => {
    let res;
    dispatch(changeStatus("loading"));
    if (picture) {
      // Upload to cloudinary and register user
      await handleUploadPicture().then(async (val) => {
        res = await dispatch(registerUser({ ...data, picture: val.secure_url }));
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }

    if (res?.payload?.user) {
      DarkModeToastSuccess({ message: "Register Successful" });
      navigate("/login");
    }
  };

  // Handlers: Handle Upload Picture
  const handleUploadPicture = async () => {
    let formData = new FormData();
    formData.append("upload_preset", upload_preset);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    return data;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold"> Welcome</h2>
          <p className="mt-2 text-sm"> Sign Up</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Name */}
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            register={register}
            error={errors?.name?.message}
          />
          {/* Email */}
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          {/* Status */}
          <AuthInput
            name="status"
            type="text"
            placeholder="Status"
            register={register}
            error={errors?.status?.message}
          />
          {/* Password */}
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* Picture */}
          <PictureInput
            previewPicture={previewPicture}
            setPicture={setPicture}
            setPreviewPicture={setPreviewPicture}
          />
          {/* If we have an error */}
          {error ? (
            <div className="mt-3">
              <p className="text-red-500 text-xs italic text-center">
                {error || "Something went wrong!"}
              </p>
            </div>
          ) : null}
          {/* Submit Button */}
          <button
            className="w-full flex justify-center 
            bg-green_1 text-gray-100 py-4 px-2 rounded-full 
            tracking-wide font-semibold focus:outline-none 
            hover:bg-green_2 shadow-lg cursor-pointer 
            transition ease-in duration-300"
            type="submit">
            {status === "loading" ? <PulseLoader color="#fff" size={12} /> : "Sign Up"}
          </button>
          {/* Sign In Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Already have an account?</span>
            <Link to="/login" className="hover:underline cursor-pointer">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
