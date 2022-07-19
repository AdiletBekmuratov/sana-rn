import React, { FC, useState } from "react";
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import { HelperText, IconButton, Text } from "react-native-paper";
import MaskInput, { Mask } from "react-native-mask-input";
import tw from "twrnc";

interface ICustomTextInput {
  label: string;
  placeholder: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText?: (
    text: string
  ) => void | ((masked: string, unmasked: string, obfuscated: string) => void);
  value?: string;
  isError?: boolean;
  errorText?: string;
  style?: string;
  secureTextEntry?: boolean;
  keyboardType: KeyboardTypeOptions;
  mask: Mask;
}

export const CustomTextInput: FC<ICustomTextInput> = ({
  label,
  placeholder,
  onBlur,
  onChangeText,
  value,
  isError,
  errorText,
  style,
  secureTextEntry,
  keyboardType,
  mask,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const handleTogglePassVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <View style={tw`${style}`}>
      <Text style={tw`mb-2 font-bold`}>{label}</Text>
      <View style={tw`relative`}>
        {mask ? (
          <MaskInput
            keyboardType={keyboardType ?? "default"}
            secureTextEntry={secureTextEntry ? passwordVisible : false}
            style={tw`border border-gray-200 rounded-lg px-4 py-2 text-black ${
              secureTextEntry ? "pr-12" : ""
            }`}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
            mask={mask}
          />
        ) : (
          <TextInput
            keyboardType={keyboardType ?? "default"}
            secureTextEntry={secureTextEntry ? passwordVisible : false}
            style={tw`border border-gray-200 rounded-lg px-4 py-2 text-black ${
              secureTextEntry ? "pr-12" : ""
            }`}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChangeText}
            value={value}
          />
        )}

        {secureTextEntry && (
          <IconButton
            icon={passwordVisible ? "eye" : "eye-off"}
            style={tw`absolute right-0`}
            onPress={handleTogglePassVisibility}
          />
        )}
      </View>

      {isError && (
        <HelperText type="error" visible={isError}>
          {errorText}
        </HelperText>
      )}
    </View>
  );
};
