import React from "react";
import { View } from "react-native";
import { Headline, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import { logout } from "../redux/slices/auth";

const Header = ({ title, rightButton, navigation, routeName }) => {
  const dispatch = useDispatch();
  const logOut = async () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={tw`bg-gray-100`}>
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
          <IconButton icon="logout" style={tw`bg-white`} onPress={logOut} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
