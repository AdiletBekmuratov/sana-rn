import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import i18n from "../i18n";
import grads from "../utils/grads";

const windowWidth = Dimensions.get("window").width;

const buttons = [
  {
    id: "1",
    title: i18n.t("MainStack.theory"),
    image: require("../assets/main-page-icons/theory.png"),
    screen: "TheoryScreen",
    grad: grads["blue"],
    disabled: false,
  },
  {
    id: "2",
    title: i18n.t("MainStack.practice"),
    image: require("../assets/main-page-icons/practice.png"),
    screen: "PracticeScreen",
    grad: grads["orange"],
    disabled: false,
  },
  {
    id: "3",
    title: i18n.t("MainStack.random"),
    image: require("../assets/main-page-icons/random.png"),
    screen: "RandomScreen",
    grad: grads["green"],
    disabled: false,
  },
  {
    id: "4",
    title: i18n.t("MainStack.challenge"),
    image: require("../assets/main-page-icons/challenge.png"),
    screen: "СhallengeScreen",
    grad: grads["red"],
    disabled: true,
  },
];

export default function Home({ navigation }) {
  return (
    <View style={tw`flex-1 bg-gray-100 px-5 pb-5`}>
      <Image
        style={{
          width: windowWidth - 40,
          height: 150,
          resizeMode: "contain",
        }}
        source={require("../assets/main-page-icons/girl.png")}
      />

      <FlatList
        style={tw`w-full`}
        data={buttons}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw.style(
              `m-2 bg-white rounded-lg shadow-md ${index <= 1 ? "mt-0" : ""} `,
              `${item.disabled ? "opacity-50" : ""}`,
              {
                flex: 0.5,
              }
            )}
            disabled={item.disabled}
          >
            <LinearGradient
              style={tw`py-4 px-4 rounded-lg`}
              colors={item.grad}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
            >
              <Image
                style={{ resizeMode: "contain", width: 48, height: 48 }}
                source={item.image}
              />
              <Text style={tw`text-white text-lg mt-6`}>{item.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
