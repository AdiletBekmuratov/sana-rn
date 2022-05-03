import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Snackbar } from "react-native-paper";
import tw from "twrnc";
import ChangeMainInfo from "../components/ChangeMainInfo";
import ChangePassword from "../components/ChangePassword";

const ChangeProfile = ({ route, navigation }) => {
  const { userData } = route.params;

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-between bg-gray-100`}>
      <ScrollView>
        <ChangeMainInfo
          setVisible={setVisible}
          setMessage={setMessage}
          userData={userData}
        />
        <View style={tw`py-2`}></View>
        {/* <ChangePassword
          setVisible={setVisible}
          setMessage={setMessage}
          userData={userData}
        /> */}
      </ScrollView>
      <View style={tw`w-full`}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </View>
  );
};

export default ChangeProfile;
