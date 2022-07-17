import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { HelperText, IconButton, Text } from "react-native-paper";
import MaskInput from "react-native-mask-input";
import tw from "twrnc";

const CustomTextInput = ({
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
            s
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

export default CustomTextInput;
