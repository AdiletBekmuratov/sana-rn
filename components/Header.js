import React from "react";
import { View } from "react-native";
import { Headline, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import tw from "twrnc";

const Header = ({ title, rightButton, navigation, routeName }) => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView>
      <View
        style={tw`flex-row justify-between items-center h-[80px] p-6 bg-gray-100`}
      >
        <Headline style={tw`text-xl font-bold`}>{title}</Headline>
        {rightButton && (
          <IconButton
            icon="chevron-left"
            style={tw`bg-white`}
            onPress={navigation.goBack}
          />
        )}
        {routeName === "Profile" && (
          <IconButton icon="logout" style={tw`bg-white`} onPress={logout} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
