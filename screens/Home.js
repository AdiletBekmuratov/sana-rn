import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const buttons = [
  {
    id: "1",
    title: "Теория",
    image: require("../assets/Theory.png"),
    screen: "TheoryScreen",
  },
  {
    id: "2",
    title: "Практика",
    image: require("../assets/Practice.png"),
    screen: "PracticeScreen",
  },
  {
    id: "3",
    title: "Рандом",
    image: require("../assets/Random.png"),
    screen: "MapScreen",
  },
  {
    id: "4",
    title: "Челлендж",
    image: require("../assets/Challenge.png"),
    screen: "EatsScreen",
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
            style={tw.style("p-4", "bg-[#002C67] m-2", "rounded", {
              flex: 0.5,
              height: 260,
            })}
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
