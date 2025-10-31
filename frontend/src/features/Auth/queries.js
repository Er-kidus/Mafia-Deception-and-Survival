import api from "./api";

// Register function
export const registerUser = async (userData) => {
  const response = await api.post("/register", userData);
  return response.data;
};

// Login function
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Logout function
export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};
