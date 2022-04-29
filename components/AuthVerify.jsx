import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/auth";
import jwt_decode from "jwt-decode";

export default function AuthVerify() {
  const dispatch = useDispatch();
  useEffect(async () => {
    setInterval(async () => {
      const jsonValue = await AsyncStorage.getItem("user");
      const user = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (user) {
        const decodedJwt = jwt_decode(user.refresh);
        if (decodedJwt.exp * 1000 < Date.now()) {
          dispatch(logout());
        }
      }
    }, 15000);
  }, []);

  return null;
}
