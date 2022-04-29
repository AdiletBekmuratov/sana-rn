import React from "react";
import { View, ScrollView } from "react-native";
import tw from "twrnc";
import ChangeMainInfo from "../components/ChangeMainInfo";
import ChangePassword from "../components/ChangePassword";

const ChangeProfile = ({ route, navigation }) => {
  const { userData } = route.params;

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-between bg-gray-100`}>
      <ScrollView>
        <ChangeMainInfo userData={userData} />
        <View style={tw`py-2`}></View>
        <ChangePassword userData={userData} />
      </ScrollView>
    </View>
  );
};

export default ChangeProfile;
