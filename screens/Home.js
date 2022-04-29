import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const buttons = [
  {
    id: "1",
    title: "Теория",
    image: require("../assets/Theory.png"),
    screen: "MapScreen",
  },
  {
    id: "2",
    title: "Order food",
    image: require("../assets/Theory.png"),
    screen: "EatsScreen",
  },
];

export default function Home() {
  return (
    <View style={tw`h-full flex-1 p-5 justify-center bg-gray-100`}>
      <FlatList
        style={tw`w-full`}
        data={buttons}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("ruh")}
            style={tw.style(
              "p-5",
              "bg-[#002C67] m-4 justify-center items-center",
              {
                flex: 0.5,
                height: 260,
              }
            )}
          >
            <View style={{ height: "100%", justifyContent: "center" }}>
              <Image style={tw`w-24 h-24`} source={item.image} />
              <Text
                style={tw`right-0 text-lg font-semibold absolute text-white`}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
