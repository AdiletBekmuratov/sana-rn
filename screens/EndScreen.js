import { CommonActions } from "@react-navigation/native";
import React from "react";
import { Image, View } from "react-native";
import { Button, Headline } from "react-native-paper";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import i18n from "@/utils/i18n";
import { useFinishTestQuery } from "@/redux/services/authorized.service";
const trophy = require("@/assets/trophy.png");

export default function EndScreen({ route, navigation }) {
  const { testId, size } = route.params;
  const { data, error, isLoading, isError } = useFinishTestQuery(testId);

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
    <View style={tw`h-full flex-1 px-5 pb-5 justify-between bg-gray-100`}>
      <Image
        style={{ resizeMode: "contain", width: "100%", maxHeight: 300 }}
        source={trophy}
      />
      <Headline style={tw`font-bold w-full text-center mt-2`}>
        {i18n.t("EndScreen.earned")} {data?.correct_ans}{" "}
        {i18n.t("EndScreen.from")} {size}
      </Headline>

      <Button style={tw`mt-4`} mode="contained" onPress={() => goHome()}>
        {i18n.t("EndScreen.goHome")}
      </Button>
    </View>
  );
}
