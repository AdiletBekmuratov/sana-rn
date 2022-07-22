import { View, TouchableOpacity, GestureResponderEvent } from "react-native";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import tw from "twrnc";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

interface IOptionButton {
  disabled: boolean;
  onPress: (event: GestureResponderEvent) => void;
  index: number;
  item: any;
  isLatex: boolean;
}

export const OptionButton: FC<IOptionButton> = ({
  disabled,
  index,
  isLatex,
  item,
  onPress,
}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={tw.style(
          "p-4",
          "rounded-xl",
          "justify-center",
          "items-center",
          "m-2",
          index % 2 === 0 ? "ml-0" : "mr-0",
          disabled
            ? item.correct
              ? "bg-green-400"
              : "bg-red-400"
            : "bg-white",
          {
            minHeight: 150,
            flex: 1,
          }
        )}
      >
        <View>
          {isLatex ? (
            <MathJaxSvg
              fontSize={16}
              color={disabled ? "#fff" : "#000"}
              fontCache={true}
              style={tw`text-center`}
            >
              {item.answer}
            </MathJaxSvg>
          ) : (
            <Text
              style={tw`text-lg text-center ${
                disabled ? "text-white" : "text-black"
              }`}
            >
              {item.answer}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};
