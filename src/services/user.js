import axios from "axios";

const API_URL = "/";

// User Sign In
const signIn = async (userData) => {
  const response = await axios.post(API_URL + "signin", userData, {
    withCredentials: true,
  });
  return response.data;
};

// User Sign Up
const signUp = async (userData) => {
  const response = await axios.post(API_URL + "signup", userData);
  return response.data;
};

// Get User Details
const getUserDetails = async () => {
  const response = await axios.get(API_URL + "user-details", {
    withCredentials: true,
  });
  return response.data.data;
};

// User Sign Out
const signOut = async () => {
  const response = await axios.get(API_URL + "signout", { withCredentials: true });
  return response.data;
};

const userService = {
  signIn,
  signUp,
  getUserDetails,
  signOut,
};

export default userService;
