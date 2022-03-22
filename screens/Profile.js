import React from "react";
import { View, Linking } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import tw from "twrnc";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { auth, db } from "../firebase";
import { useObject } from "react-firebase-hooks/database";
import Spinner from "../components/Spinner";
import { ref } from "firebase/database";

export default function Profile({navigation}) {
  const [snapshot, loading, error] = useObject(
    ref(db, "users/" + auth.currentUser.uid)
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 p-5 justify-between bg-gray-100`}>
      <Card>
        <Card.Content style={tw`items-center justify-between`}>
					<IconButton icon={'pen'} style={tw`absolute right-2 top-2`} onPress={() => navigation.navigate('ChangeProfile', {userData: snapshot.val()})} />
          <MaterialIcons name="account-circle" size={100} color="gray" />
          <Text style={tw`text-xl font-bold`}>
            {snapshot.val().firstName} {snapshot.val().lastName}
          </Text>
          <Text style={tw`text-lg`}>{snapshot.val().email}</Text>
          <Text style={tw`text-lg underline`}>
            {snapshot.val().phoneNumber}
          </Text>
        </Card.Content>
      </Card>
      <Button
        color="#002C67"
        mode="contained"
        icon={"whatsapp"}
        onPress={() =>
          Linking.openURL(
            "https://api.whatsapp.com/send?phone=77023006177&text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5.%20'Sana'%20%D2%9B%D0%BE%D1%81%D1%8B%D0%BC%D1%88%D0%B0%D1%81%D1%8B%20%D0%B6%D0%B0%D0%B9%D0%BB%D1%8B%20%D1%81%D2%B1%D1%80%D0%B0%D2%93%D1%8B%D0%BC%20%D0%B1%D0%B0%D1%80%20%D0%B5%D0%B4%D1%96."
          )
        }
      >
        Барлық сұрақтар бойынша
      </Button>
    </View>
  );
}
