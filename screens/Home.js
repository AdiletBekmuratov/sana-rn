import { ProgressCard } from "@/components/MainPage";
import grads from "@/utils/grads";
import i18n from "@/utils/i18n";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
	Dimensions,
	FlatList,
	Image,
	ScrollView,
	TouchableOpacity,
	View
} from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";

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
    <View style={tw`flex-1 justify-start bg-gray-100`}>
      <ScrollView>
        <View style={tw`px-5`}>
          <Image
            style={{
              width: windowWidth - 40,
              height: 150,
              resizeMode: "contain",
            }}
            source={require("../assets/main-page-icons/girl.png")}
          />
          <ScrollView contentContainerStyle={tw`flex-grow`} horizontal={true}>
            <View style={tw`flex-1`}>
              <FlatList
                nestedScrollEnabled
                data={buttons}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    style={tw.style(
                      `m-2 bg-white rounded-lg shadow-md ${
                        index <= 1 ? "mt-0" : ""
                      } `,
                      `${item.disabled ? "opacity-50" : ""}`,
                      {
                        flex: 0.5,
                      }
                    )}
                    disabled={item.disabled}
                  >
                    <LinearGradient
                      style={tw`py-4 px-4 rounded-lg flex-1`}
                      colors={item.grad}
                      start={{ x: 0.0, y: 0.0 }}
                      end={{ x: 0.0, y: 1.0 }}
                    >
                      <Image
                        style={{ resizeMode: "contain", width: 48, height: 48 }}
                        source={item.image}
                      />
                      <Text style={tw`text-white text-lg mt-6`}>
                        {item.title}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>

          <View style={tw`mt-6`}>
            <Text style={tw`text-lg`}>Прогресс</Text>
            <ProgressCard
              style="mt-2"
              subject="Math"
              currentScore={5}
              maxScore={10}
              progress={0.5}
            />
            <ProgressCard
              style="mt-2"
              subject="Math"
              currentScore={100}
              maxScore={100}
              progress={1.0}
            />
            <ProgressCard
              style="mt-2"
              subject="Math"
              currentScore={5}
              maxScore={10}
              progress={0.5}
            />
            <ProgressCard
              style="mt-2"
              subject="Math"
              currentScore={100}
              maxScore={100}
              progress={1.0}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
