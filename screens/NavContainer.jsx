import { NavigationContainer } from "@react-navigation/native";
import AuthVerify from "@/components/AuthVerify";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme,
  Snackbar,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import { addUser, clearMessage } from "@/redux/slices/auth";
import AuthStack from "@/stacks/AuthStack";
import BottomBar from "@/stacks/BottomBar";
import tw from "twrnc";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#002C67",
    accent: "#52AEF3",
  },
};

export default function NavContainer() {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const onDismissSnackBar = () => dispatch(clearMessage());

  useEffect(() => {
    dispatch(addUser());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            {user === null ? <AuthStack /> : <BottomBar />}
            <View style={tw`w-full px-5 items-center`}>
              <Snackbar
                duration={3000}
                visible={
                  message !== null &&
                  message !== undefined &&
                  message.length > 0
                }
                onDismiss={onDismissSnackBar}
              >
                {message}
              </Snackbar>
            </View>
            <AuthVerify />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
