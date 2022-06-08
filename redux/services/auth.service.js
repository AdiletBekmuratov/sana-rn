import axios from "axios";
import { API_URL } from "../http";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "/user/register/", userData);

  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "/user/login/", userData);

  if (response.data) {
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const updateAccessToken = async (accessToken) => {
  const jsonValue = await AsyncStorage.getItem("user");
  const user = jsonValue != null ? JSON.parse(jsonValue) : null;
  user.access = accessToken;
  console.log("token updated", { user });
  await AsyncStorage.setItem("user", JSON.stringify(user));
  return user;
};

// Logout user
const logout = async () => {
  await AsyncStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  updateAccessToken,
};

export default authService;
