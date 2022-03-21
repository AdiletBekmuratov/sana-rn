import React from "react";
import { View } from "react-native";
import { Headline, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Header = ({ title, rightButton, navigation, home }) => {
	const logout = async () => {
    console.log("Logout");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView>
      <View style={tw`flex-row justify-between items-center h-[80px] p-6`}>
        <Headline style={tw`text-xl font-bold`}>{title}</Headline>
        {rightButton && (
          <IconButton
            icon="chevron-left"
            style={{ backgroundColor: "#eeeeee" }}
            onPress={navigation.goBack}
          />
        )}
        {home === "Home" && (
          <IconButton
            icon="logout"
            style={{ backgroundColor: "#eeeeee" }}
            onPress={logout}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
