import axios from "axios";
import { getCookie } from "@/lib/jwt";
import { url } from "./user";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const excludedEndpoints = [url.login, url.registration];
    const isExcluded = excludedEndpoints.some((endpoint) =>
      originalRequest.url.includes(endpoint)
    );

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isExcluded
    ) {
      console.log("401 error, attempting to refresh token...");
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          "/api/refresh",
          {},
          { withCredentials: true }
        );

        if (refreshResponse.data.accessToken) {
          console.log("Token refreshed successfully.");
          document.cookie = `accessToken=${refreshResponse.data.accessToken}; path=/;`;

          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
          return api(originalRequest);
        } else {
          console.log("Failed to refresh token.");
        }
      } catch (error) {
        console.error("Refresh token failed or expired:", error);
        document.cookie =
          "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie =
          "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
