import axios from "axios";

const API_URL = "/"; // Assuming a RESTful API endpoint

export interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData {
  name: string;
  email: string;
  password: string;
}

// User Sign In
const signIn = async (userData: UserSignInData): Promise<User> => {
  const response = await axios.post(API_URL + "signin", userData, {
    withCredentials: true,
  });
  return response.data;
};

// User Sign Up
const signUp = async (userData: UserSignUpData): Promise<User> => {
  const response = await axios.post(API_URL + "signup", userData);
  return response.data;
};

// Get User Details
const getUserDetails = async (): Promise<User> => {
  const response = await axios.get(API_URL + "user-details", {
    withCredentials: true,
  });
  return response.data.data;
};

// User Sign Out
const signOut = async (): Promise<any> => {
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
