import { Image, View } from "react-native";
import React from "react";
import { ProgressBar, Text } from "react-native-paper";
import tw from "twrnc";

export const ProgressCard = ({
  style = "",
  subject = "",
  currentScore = 0,
  maxScore = 0,
  progress = 0,
  image,
}) => {
  return (
    <View style={tw`flex flex-row ${style}`}>
      <View
        style={tw`aspect-square w-20 bg-gray-200 rounded-2xl justify-center items-center`}
      >
        <Image
          style={{ resizeMode: "contain", width: 48, height: 48 }}
          source={require("../../assets/main-page-icons/theory.png")}
        />
      </View>
      <View style={tw`justify-center ml-4 flex-1`}>
        <Text style={tw`text-lg`}>{subject}</Text>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex-1 justify-center`}>
            <ProgressBar
              progress={progress}
              style={tw`h-3 rounded-full mt-1`}
              color="#2CB139"
            />
          </View>
          <Text style={tw`ml-4`}>
            {currentScore} / {maxScore}
          </Text>
        </View>
      </View>
    </View>
  );
};
