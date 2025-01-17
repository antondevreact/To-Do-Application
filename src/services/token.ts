import api from "./axios";

export const refreshAccessToken = async () => {
  try {
    const response = await api.post("/refresh", {}, { withCredentials: true });
    return response.data.accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
