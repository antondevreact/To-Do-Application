import * as Yup from "yup";

export const AuthorizationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email,specify @ in email address")
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please include @ in your email address"
    ),
  password: Yup.string().trim().required("Password required"),
});

export const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email,specify @ in email address")
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please include @ in your email address"
    ),
  password: Yup.string()
    .trim()
    .required("Password required")
    .min(8, "The password is too short - minimum 8 characters.")
    .matches(/[a-zA-Z]/, "The password can only contain Latin letters.")
    .matches(
      /[A-Z]/,
      "The password must contain at least one capitalized letter."
    )
    .matches(
      /[a-z]/,
      "The password must contain at least one lower case letter."
    )
    .matches(/\d/, "The password must contain numbers.")
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "The password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Please confirm your password"),
});

export const ServerRegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email, specify @ in email address")
    .required("Email is required")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please include @ in your email address"
    ),
  password: Yup.string()
    .trim()
    .required("Password is required")
    .min(8, "The password is too short - minimum 8 characters.")
    .matches(/[a-zA-Z]/, "The password can only contain Latin letters.")
    .matches(
      /[A-Z]/,
      "The password must contain at least one capitalized letter."
    )
    .matches(
      /[a-z]/,
      "The password must contain at least one lower case letter."
    )
    .matches(/\d/, "The password must contain numbers.")
    .matches(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      "The password must contain at least one special character"
    ),
});
