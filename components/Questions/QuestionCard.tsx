import { View } from "react-native";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import tw from "twrnc";
import i18n from "@/utils/i18n";

interface IQuestionCard {
  questionNumber: number;
  questionText: string;
}

export const QuestionCard: FC<IQuestionCard> = ({
  questionNumber,
  questionText,
}) => {
  return (
    <View style={tw`rounded-xl bg-white p-4 items-center`}>
      <Text style={tw`font-bold text-lg mb-2`}>
        {i18n.t("QuestionsScreen.title")}
        {questionNumber}
      </Text>
      <Text style={tw`text-center`}>{questionText}</Text>
    </View>
  );
};
