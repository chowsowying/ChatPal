import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput";
import { useSelector, useDispatch } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, loginUser } from "../../redux/userSlice";
import { DarkModeToastSuccess } from "../../utils/CustomToast";

const LoginForm = () => {
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
  } = useForm({ resolver: yupResolver(signInSchema) });

  // Handlers: Handle Submit
  const onSubmit = async (data) => {
    dispatch(changeStatus("loading"));
    let res = await dispatch(loginUser({ ...data }));
    if (res?.payload?.user) {
      DarkModeToastSuccess({ message: "Login Successful" });
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold"> Welcome back</h2>
          <p className="mt-2 text-sm"> Sign In</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {/* Email */}
          <AuthInput
            name="email"
            type="text"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          {/* Password */}
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
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
            {status === "loading" ? <PulseLoader color="#fff" size={12} /> : "Sign In"}
          </button>
          {/* Sign Up Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Do not have an account ? </span>
            <Link to="/register" className="hover:underline cursor-pointer">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
