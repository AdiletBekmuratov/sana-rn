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
    <SafeAreaView style={tw`bg-white dark:bg-black`}>
      <View
        style={tw`flex-row ${
          rightButton ? "justify-center" : "justify-start"
        } items-center h-[80px] p-5 bg-gray-100 relative`}
      >
        {rightButton && (
          <IconButton
            icon="chevron-left"
            style={tw`absolute left-5`}
            onPress={navigation.goBack}
          />
        )}
        <Headline style={tw`text-xl`}>{title}</Headline>
        <View></View>
        {routeName === "Profile" && (
          <IconButton icon="logout" style={tw`bg-white`} onPress={logOut} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
