import { NavigationContainer } from "@react-navigation/native";
import AuthVerify from "../components/AuthVerify";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { addUser } from "../redux/slices/auth";
import AuthStack from "../stacks/AuthStack";
import BottomBar from "../stacks/BottomBar";

export default function NavContainer() {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(addUser());
  }, []);

  console.log("User", { user });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            {user === null ? <AuthStack /> : <BottomBar />}
            <AuthVerify />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
