import { View } from "react-native";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import tw from "twrnc";
import i18n from "@/utils/i18n";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

interface IQuestionCard {
  questionNumber: number;
  questionText: string;
  isLatex: boolean;
}

export const QuestionCard: FC<IQuestionCard> = ({
  questionNumber,
  questionText,
  isLatex,
}) => {
  return (
    <View style={tw`rounded-xl bg-white p-4 items-center`}>
      <Text style={tw`font-bold text-lg mb-2`}>
        {i18n.t("QuestionsScreen.title")}
        {questionNumber}
      </Text>
      {isLatex ? (
        <MathJaxSvg
          fontSize={16}
          color={"#000"}
          fontCache={true}
          style={tw`text-center`}
        >
          {questionText}
        </MathJaxSvg>
      ) : (
        <Text style={tw`text-center`}>{questionText}</Text>
      )}
    </View>
  );
};
