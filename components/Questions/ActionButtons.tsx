import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import i18n from "@/utils/i18n";
import tw from "twrnc";
import { IQuestions } from "@/types/index";

interface IActionButtons {
  disabled: boolean;
  questions: IQuestions[];
  pressedBtns: number[];
  currentQ: number;
  handleSubmit: (event: GestureResponderEvent) => void;
  handleFinish: (event: GestureResponderEvent) => void;
  handleNext: (event: GestureResponderEvent) => void;
}

export const ActionButtons: FC<IActionButtons> = ({
  currentQ,
  disabled,
  handleFinish,
  handleNext,
  handleSubmit,
  pressedBtns,
  questions,
}) => {
  if (!disabled) {
    return questions[currentQ]?.multichoice ? (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleSubmit}
        disabled={pressedBtns.length <= 0 || disabled}
        style={tw`bg-blue-300 rounded-xl p-4 items-center`}
      >
        <Text style={tw`text-white font-bold`}>
          {i18n.t("QuestionsScreen.submit")}
        </Text>
      </TouchableOpacity>
    ) : null;
  }

  return (
    <View style={tw`flex flex-row justify-between items-center w-full`}>
      {questions.length - 1 > currentQ && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleFinish}
          disabled={pressedBtns.length <= 0}
          style={tw`bg-white rounded-xl p-4 items-center flex-1 border-2 border-blue-300 mr-2`}
        >
          <Text style={tw`text-blue-300 font-bold`}>
            {i18n.t("QuestionsScreen.finish")}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handleNext}
        disabled={pressedBtns.length <= 0}
        style={tw`bg-blue-300 rounded-xl p-4 items-center flex-1 ml-2`}
      >
        <Text style={tw`text-white font-bold`}>
          {questions.length - 1 > currentQ
            ? i18n.t("QuestionsScreen.next")
            : i18n.t("QuestionsScreen.finish")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
