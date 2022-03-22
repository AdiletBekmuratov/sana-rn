import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Spinner from "./components/Spinner";
import { auth } from "./firebase";
import AuthStack from "./stacks/AuthStack";
import BottomBar from "./stacks/BottomBar";


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
            {user == null ? <AuthStack /> : <BottomBar />}
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
