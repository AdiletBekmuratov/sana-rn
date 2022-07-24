import React, { FC } from "react";
import { GestureResponderEvent, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import tw from "twrnc";

interface IFooterButton {
  onPress: (event: GestureResponderEvent) => void;
  style?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const FooterButton: FC<IFooterButton> = ({
  onPress,
  loading,
  disabled,
  style,
  children,
}) => {
  return (
    <>
      {disabled ? (
        <View
          style={tw`flex flex-row p-4 mt-4 bg-gray-200 rounded-lg items-center justify-center ${style}`}
        >
          {loading && <ActivityIndicator color="gray" size={16} />}
          <Text style={tw`text-gray-400 ml-2`}>{children}</Text>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          disabled={disabled}
          style={tw`bg-white rounded-xl mt-4 p-4 items-center border-2 border-blue-300 ${style}`}
        >
          <Text style={tw`text-blue-300 font-bold`}>{children}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
