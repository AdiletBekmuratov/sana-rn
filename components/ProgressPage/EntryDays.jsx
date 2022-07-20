import { View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import grads from "@/utils/grads";
import {
  getCurrentMonthName,
  getCurrentWeekDaysNumbers,
  getMinWeekNames,
} from "@/utils/date";

export const EntryDays = () => {
  return (
    <View style={tw`p-4 rounded-xl shadow-md bg-white`}>
      <View style={tw`flex flex-row justify-center items-center relative`}>
        <View style={tw`flex-1 items-center justify-center`}>
          <LinearGradient
            style={tw`justify-center items-center p-4 w-24 aspect-square rounded-full`}
            colors={grads["green"]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >
            <Text style={tw`text-4xl text-white`}>1</Text>
          </LinearGradient>
          <Text style={tw`text-xl text-center mt-2`}>
            Барлық {"\n"} кірген күн
          </Text>
        </View>
        <View style={tw`w-px bg-gray-300 h-4/5 absolute`} />
        <View style={tw`flex-1 items-center justify-center`}>
          <LinearGradient
            style={tw`justify-center items-center p-4 w-24 aspect-square rounded-2xl`}
            colors={grads["red_orange"]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 1.0, y: 1.0 }}
          >
            <Text style={tw`text-4xl text-white`}>1</Text>
          </LinearGradient>
          <Text style={tw`text-xl text-center mt-2`}>
            Қатарынан {"\n"} кірген күн
          </Text>
        </View>
      </View>
      <View style={tw`flex-row justify-between items-center mt-4`}>
        {getMinWeekNames().map((wName, index) => (
          <Text key={index} style={tw`text-gray-400 capitalize text-sm`}>
            {wName}
          </Text>
        ))}
      </View>
      <View style={tw`flex-row justify-center items-center mt-2 relative`}>
        <View style={tw`h-px bg-gray-300 w-full absolute`} />
        <Text style={tw`text-gray-400 capitalize text-sm bg-white px-4`}>
          {getCurrentMonthName()}
        </Text>
      </View>
      <View style={tw`flex-row justify-between items-center mt-2`}>
        {getCurrentWeekDaysNumbers().map((dayNum, index) => (
          <Text
            key={index}
            style={tw`bg-gray-100 text-gray-300 p-2 rounded-full`}
          >
            {dayNum}
          </Text>
        ))}
      </View>
    </View>
  );
};
