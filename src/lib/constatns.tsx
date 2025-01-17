import { Frown, NotebookPen } from "lucide-react";
import { ILogin, IRegistration } from "@/lib/interface/user";
import { MESSAGES } from "@/src/common";

export const loginInputFields: Array<{
  id: string;
  name: keyof ILogin;
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
];

export const regiserInputFields: Array<{
  id: string;
  name: keyof IRegistration;
  label: string;
  type: string;
  placeholder: string;
}> = [
  {
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Repeat your password",
  },
];

export const ROUTE = {
  MAIN: "/",
  REGISTRATION: "/registration",
  LOGIN: "/login",
};

export const PRIVATE_ROUTES = [ROUTE.LOGIN, ROUTE.REGISTRATION];

export const INFO_MESSAGES = [
  {
    text: MESSAGES.ADD_TODO,
    icon: <Frown />,
  },
  {
    text: MESSAGES.EMPTY_TODOS,
    icon: <NotebookPen />,
  },
];

export const navLinks = [
  { path: "/", label: "Home" },
  { path: "#", label: "About" },
];
