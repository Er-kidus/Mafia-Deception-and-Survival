import * as yup from "yup";

export const signupSchema = yup.object().shape({
  username: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain one special character"
    ),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain one special character"
    ),
});
