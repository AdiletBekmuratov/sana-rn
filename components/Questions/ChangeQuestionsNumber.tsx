import {
  useGetQuestionQuantityQuery,
  useUpdateQuestionQuantityMutation,
} from "@/redux/services/authorized.service";
import grads from "@/utils/grads";
import i18n from "@/utils/i18n";
import MultiSlider, {
  MarkerProps,
} from "@ptomasroos/react-native-multi-slider";
import { LinearGradient } from "expo-linear-gradient";
import React, { ComponentType, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";

const windowWidth = Dimensions.get('window').width;

export const ChangeQuestionsNumber = () => {
  const {
    data: questionQuantityData,
    error: questionQuantityErr,
    isLoading: questionQuantityIsLoading,
  } = useGetQuestionQuantityQuery();
  const [updateQQ] = useUpdateQuestionQuantityMutation();

  const [sliderOneValue, setSliderOneValue] = useState([10]);

  useEffect(() => {
    setSliderOneValue([questionQuantityData?.quantity_of_questions ?? 10]);
  }, [questionQuantityData]);

  const sliderOneValuesChange = (values) => setSliderOneValue(values);

  const sliderOneValuesChangeFinish = async (values) => {
    try {
      await updateQQ({
        quantity_of_questions: values[0],
      });
    } catch (error) {
      console.log("QQERR", error);
    }
  };
  return (
    <View style={tw`flex justify-center items-center`}>
      <View style={tw`flex flex-row justify-between items-center w-full`}>
        <Text style={tw`font-bold`}>{i18n.t("ProfileScreen.number_of_questions")}</Text>
        <Text style={tw`text-[#FFB512]`}>{sliderOneValue}</Text>
      </View>

      <View style={tw`flex justify-center items-center w-full`}>
        <View style={tw`w-full`}>
          <MultiSlider
            customMarker={CustomMarker}
            selectedStyle={{
              backgroundColor: "#FFB512",
            }}
            trackStyle={tw`h-2 rounded-full`}
            min={10}
            max={100}
            step={5}
            values={sliderOneValue}
            snapped={true}
            onValuesChange={sliderOneValuesChange}
            onValuesChangeFinish={sliderOneValuesChangeFinish}
						sliderLength={windowWidth - 40}
          />
        </View>
        <View style={tw`flex flex-row justify-between items-center w-full`}>
          <Text style={tw`text-gray-400`}>10</Text>
          <Text style={tw`text-gray-400`}>100</Text>
        </View>
      </View>
    </View>
  );
};

const CustomMarker: ComponentType<MarkerProps> = ({}) => {
  return (
    <View style={tw`p-px bg-gray-100 rounded-full`}>
      <LinearGradient
        style={tw`justify-center items-center p-2 mt-1 aspect-square rounded-full`}
        colors={grads["red_orange"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
      />
    </View>
  );
};
