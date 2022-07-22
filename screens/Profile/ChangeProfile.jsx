import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import { ChangeMainInfo, ChangePassword } from "@/components/ProfilePage";

export const ChangeProfile = ({ route, navigation }) => {
  const { userData } = route.params;

  return (
    <View style={tw`flex-1 justify-between bg-gray-100 relative`}>
      <ScrollView>
        <ChangeMainInfo userData={userData} />
        <View style={tw`py-2`}></View>
        <ChangePassword />
      </ScrollView>
    </View>
  );
};
