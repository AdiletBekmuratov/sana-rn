import { LinearGradient } from "expo-linear-gradient";
import React, { ReactNode } from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";
import grads, { Grads } from "../../utils/grads";
import { FC } from "react";

interface ICustomButton {
  variant?: Grads;
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: string;
  disabled?: boolean;
  grad?: string[];
  textPosition?: "items-center" | "items-start" | "items-end";
}

export const CustomButton: FC<ICustomButton> = ({
  variant = "blue",
  children,
  onPress,
  style,
  disabled,
  grad,
  textPosition = "items-center",
}) => {
  return (
    <>
      {disabled ? (
        <View
          style={tw`py-4 px-4 bg-gray-200 rounded-lg ${textPosition} ${style}`}
        >
          <Text style={tw`text-gray-400`}>{children}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={tw`${style}`}
          onPress={onPress}
          activeOpacity={0.5}
          disabled={disabled}
        >
          <LinearGradient
            style={tw`py-4 px-4 rounded-lg ${textPosition}`}
            colors={grad ?? grads[variant]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >
            <Text style={tw`text-white`}>{children}</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </>
  );
};
