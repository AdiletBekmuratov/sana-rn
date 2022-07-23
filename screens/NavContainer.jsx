import AuthVerify from "@/components/AuthVerify";
import Spinner from "@/components/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addUser, clearMessage } from "@/redux/slices/auth";
import AuthStack from "@/stacks/AuthStack";
import BottomBar from "@/stacks/BottomBar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import {
  DefaultTheme,
  Provider as PaperProvider,
  Snackbar,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
  const dispatch = useAppDispatch();

  const { user, isLoading, isError, isSuccess, message } = useAppSelector(
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
    <BottomSheetModalProvider>
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
    </BottomSheetModalProvider>
  );
}
