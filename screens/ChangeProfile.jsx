import React from "react";
import { ScrollView, View } from "react-native";
import tw from "twrnc";
import ChangeMainInfo from "../components/ChangeMainInfo";
import ChangePassword from "../components/ChangePassword";

const ChangeProfile = ({ route, navigation }) => {
  const { userData } = route.params;

  return (
    <View style={tw`flex-1 justify-between bg-gray-100 relative`}>
      <ScrollView>
        <ChangeMainInfo userData={userData} />
        <View style={tw`py-2`}></View>
        <ChangePassword userData={userData} />
      </ScrollView>
    </View>
  );
};

export default ChangeProfile;
