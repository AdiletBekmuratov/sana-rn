import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";
import i18n from "../i18n";

const buttons = [
  {
    id: "1",
    title: i18n.t("MainStack.theory"),
    image: require("../assets/Theory.png"),
    screen: "TheoryScreen",
    disabled: false,
  },
  {
    id: "2",
    title: i18n.t("MainStack.practice"),
    image: require("../assets/Practice.png"),
    screen: "PracticeScreen",
    disabled: false,
  },
  {
    id: "3",
    title: i18n.t("MainStack.random"),
    image: require("../assets/Random.png"),
    screen: "RandomScreen",
    disabled: false,
  },
  {
    id: "4",
    title: i18n.t("MainStack.challenge"),
    image: require("../assets/Challenge.png"),
    screen: "СhallengeScreen",
    disabled: true,
  },
];

export default function Home({ navigation }) {
  return (
    <View style={tw`h-full flex-1 px-5 justify-center bg-gray-100`}>
      <FlatList
        style={tw`w-full`}
        data={buttons}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={tw.style(
              "p-4",
              "bg-[#002C67] m-2",
              "rounded",
              `${item.disabled ? "opacity-50" : ""}`,
              {
                flex: 0.5,
                height: 260,
              }
            )}
            disabled={item.disabled}
          >
            <View>
              <Text style={tw`text-lg font-bold text-white`}>{item.title}</Text>
              <Image
                style={{ resizeMode: "cover", width: 140, height: 200 }}
                source={item.image}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
