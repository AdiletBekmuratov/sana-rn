import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthStack from "./stacks/AuthStack";
import MainStack from "./stacks/MainStack";
import Spinner from "./components/Spinner";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
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
            {user == null ? <AuthStack /> : <MainStack />}
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
