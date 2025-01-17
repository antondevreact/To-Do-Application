import api from "./axios";
import { ILogin as IReguest } from "@/lib/interface/user";

export const url = {
  registration: "user/registration",
  login: "user/login",
  logout: "user/logout",
};

export const registerUser = async (payload: IReguest) => {
  try {
    const { data } = await api.post(url.registration, payload);

    if (data.accessToken) {
      document.cookie = `accessToken=${data.accessToken}; path=/;`;
    }

    return data;
  } catch (error) {
    console.error("Error during user registration:", error);

    throw error;
  }
};

export const loginUser = async (payload: IReguest) => {
  try {
    const { data } = await api.post(url.login, payload);

    if (data.accessToken) {
      document.cookie = `accessToken=${data.accessToken}; path=/;`;
    }

    return data;
  } catch (error) {
    console.error("Error during user authorization:", error);

    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post(url.logout);
  } catch (error) {
    console.error("Error during log out:", error);

    throw error;
  }
};
