import React, { FC, ReactNode } from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

interface IButtonGroup {
  containerStyle?: string;
  buttons: {
    children: ReactNode;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
  }[];
}

export const ButtonGroup: FC<IButtonGroup> = ({ buttons, containerStyle }) => {
  return (
    <View style={tw`${containerStyle}`}>
      {buttons.map((button, index) =>
        button?.onPress ? (
          <TouchableOpacity
            key={index + "-button"}
            activeOpacity={0.5}
            disabled={button?.disabled}
            style={tw`p-4 bg-white shadow ${
              index !== 0 ? "border-t border-gray-100" : ""
            } ${
              index === 0
                ? "rounded-t-lg"
                : index !== 0 && index !== buttons.length - 1
                ? ""
                : "rounded-b-lg"
            } ${button?.disabled ? "bg-gray-200" : ""}`}
            onPress={button.onPress}
          >
            {button.children}
          </TouchableOpacity>
        ) : (
          <View
            key={index + "-button"}
            style={tw`p-4 bg-white shadow ${
              index !== 0 ? "border-t border-gray-100" : ""
            } ${
              index === 0
                ? "rounded-t-lg"
                : index !== 0 && index !== buttons.length - 1
                ? ""
                : "rounded-b-lg"
            }`}
          >
            {button.children}
          </View>
        )
      )}
    </View>
  );
};
