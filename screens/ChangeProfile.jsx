import React from "react";
import { View } from "react-native";
import tw from "twrnc";
import ChangePassword from "../components/ChangePassword";

const ChangeProfile = ({ route, navigation }) => {
  const { userData } = route.params;

  return (
    <View style={tw`h-full flex-1 p-5 justify-between bg-gray-100`}>
      <ChangePassword userData={userData} />
    </View>
  );
};

export default ChangeProfile;
