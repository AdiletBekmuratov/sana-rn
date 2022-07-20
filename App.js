import React, { useEffect } from "react";
import { Provider } from "react-redux";
import NavContainer from "@/screens/NavContainer";
import store from "@/redux/store";
import i18n from "@/utils/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  useEffect(() => {
    const setLocale = async () => {
      i18n.locale = (await AsyncStorage.getItem("locale")) ?? "kz";
    };
    setLocale();
  }, []);

  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
}
