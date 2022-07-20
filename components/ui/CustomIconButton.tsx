import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { FC } from "react";
import {
  GestureResponderEvent,
  OpaqueColorValue,
  TouchableOpacity,
} from "react-native";
import tw from "twrnc";

interface ICustomIconButton {
  name: any;
  onPress: (event: GestureResponderEvent) => void;
  style?: string;
  color?: string | OpaqueColorValue;
  size?: number;
}

export const CustomIconButton: FC<ICustomIconButton> = ({
  onPress,
  name,
  style,
  color,
  size = 24,
}) => {
  return (
    <TouchableOpacity
      style={tw`rounded-xl p-2 ${style}`}
      activeOpacity={0.5}
      onPress={onPress}
    >
      <Icons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};
