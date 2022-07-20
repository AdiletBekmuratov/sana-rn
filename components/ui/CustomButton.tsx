import grads, { Grads } from "@/utils/grads";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, ReactNode } from "react";
import {
	GestureResponderEvent, TouchableOpacity,
	View
} from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import tw from "twrnc";

interface ICustomButton {
  variant?: Grads;
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: string;
  disabled?: boolean;
  grad?: string[];
  textPosition?: "items-center" | "items-start" | "items-end";
  loading?: boolean;
}

export const CustomButton: FC<ICustomButton> = ({
  variant = "blue",
  children,
  onPress,
  style,
  disabled,
  grad,
  textPosition = "items-center",
  loading,
}) => {
  return (
    <>
      {disabled ? (
        <View
          style={tw`flex flex-row p-4 bg-gray-200 rounded-lg items-center ${
            "justify" + textPosition.substring(textPosition.indexOf("-"))
          }  ${style}`}
        >
          {loading && <ActivityIndicator color="gray" size={16} />}
          <Text style={tw`text-gray-400 ml-2`}>{children}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={tw`${style}`}
          onPress={onPress}
          activeOpacity={0.5}
          disabled={disabled}
        >
          <LinearGradient
            style={tw`p-4 rounded-lg ${textPosition}`}
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
