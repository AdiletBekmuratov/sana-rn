import Spinner from "@/components/Spinner";
import { useFinishTestQuery } from "@/redux/services/authorized.service";
import grads from "@/utils/grads";
import i18n from "@/utils/i18n";
import { CommonActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { Headline, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "twrnc";
const dialogBubble = require("@/assets/end-screen/dialog-bubble.png");
const randomGirl = require("@/assets/end-screen/random-end.png");
const practiceGirl = require("@/assets/end-screen/practice-end.png");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function EndScreen({ route, navigation }) {
  const { testId, size, type } = route.params;
  const { data, error, isLoading, isError } = useFinishTestQuery(testId);
  const insets = useSafeAreaInsets();

  const goHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "HomeScreen" }],
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1`}>
      <LinearGradient
        style={{
          paddingTop: insets.top,
          flex: 1,
        }}
        colors={type === "practice" ? grads["red_orange"] : grads["green"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
      >
        <View style={tw`h-[80px] p-5 relative items-center justify-center`}>
          <Headline style={tw`text-xl text-white`}>
            {i18n.t("MainStack.results")}
          </Headline>
        </View>
        <View style={tw`px-5 pb-5 justify-between items-center w-full flex-1`}>
          <View>
            <Image
              style={{
                width: windowWidth - 120,
                height: 150,
                resizeMode: "contain",
              }}
              source={dialogBubble}
            />
            <Image
              style={{
                width: windowWidth - 120,
                height: (windowHeight * 40) / 100,
                resizeMode: "contain",
              }}
              source={type === "practice" ? practiceGirl : randomGirl}
            />
          </View>

          <Headline style={tw`font-bold w-full text-center mt-2 text-white`}>
            {i18n.t("EndScreen.earned")}
            {"\n"}
            {data?.correct_ans} {i18n.t("EndScreen.from")} {size}
          </Headline>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => goHome()}
            style={tw`bg-white rounded-xl p-4 items-center w-full`}
          >
            <Text style={tw`${type === 'practice' ? 'text-red-400' : 'text-green-500'} font-bold`}>
              {i18n.t("EndScreen.goHome")}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}
