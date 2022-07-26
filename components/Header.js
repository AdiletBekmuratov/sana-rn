import React from "react";
import { View } from "react-native";
import { Headline, IconButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const Header = ({ title, rightButton, navigation, routeName }) => {
  return (
    <SafeAreaView style={tw`bg-black dark:bg-white`}>
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
      </View>
    </SafeAreaView>
  );
};

export default Header;
