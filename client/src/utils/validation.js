import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/, "Name must contain only alphabets")
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name must be at most 30 characters"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  status: Yup.string().max(100, "Status must be at most 100 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(30, "Password must be at most 30 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Password requires: 1 uppercase, 1 lowercase, 1 number. "
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});
