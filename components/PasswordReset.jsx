import {
  useChangePasswordOTPMutation,
  useCheckOTPMutation,
  useGenerateOTPMutation,
} from "@/redux/services/unauthorized.service";
import i18n from "@/utils/i18n";
import React, { useMemo, useState, useCallback } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import tw from "twrnc";

import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { View } from "react-native";
import { CustomGradientButton, CustomTextInput } from "./ui";
import { useAppDispatch } from "@/redux/hooks";
import { addMessage } from "@/redux/slices/auth";

export default function PasswordReset({ handleClosePress, sheetRef }) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const [hideFirstBtn, setHideFirstBtn] = useState(false);
  const [hideSecondBtn, setHideSecondBtn] = useState(true);
  const [hideThirdBtn, setHideThirdBtn] = useState(true);

  const snapPoints = useMemo(() => ["40%"], []);

  const [
    generateOTP,
    {
      isError: isErrorGenerate,
      isSuccess: isSuccessGenerate,
      error: errorGenerate,
      isLoading: isLoadingGenerate,
    },
  ] = useGenerateOTPMutation();

  const [
    checkOTP,
    {
      isError: isErrorCheckOTP,
      isSuccess: isSuccesCheckOTP,
      error: errorCheckOTP,
      isLoading: isLoadingCheckOTP,
    },
  ] = useCheckOTPMutation();

  const [
    changeOTP,
    {
      isError: isErrorChangeOTP,
      isSuccess: isSuccesChangeOTP,
      error: errorChangeOTP,
      isLoading: isLoadingChangeOTP,
    },
  ] = useChangePasswordOTPMutation();

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handleOTPChange = (text) => {
    setOtp(text);
  };

  const handlePasswordChange = (text) => {
    setNewPass(text);
  };

  const handleClose = () => {
    setEmail("");
    setOtp("");
    setNewPass("");
    setHideFirstBtn(false);
    setHideSecondBtn(true);
    setHideThirdBtn(true);
    setMessage(null);
    handleClosePress();
  };

  const handleGeneratePassword = async () => {
    await generateOTP({ email: email.trim().toLowerCase() })
      .unwrap()
      .then((res) => {
        console.log({ res });
        setHideFirstBtn(true);
        setHideSecondBtn(false);
        setMessage({ text: i18n.t("ForgotPasswordDialog.codeSent") });
      })
      .catch((err) => {
        console.log(err);
        setMessage({ type: "error", text: err.data.message });
      });
  };

  const handleCheckOTP = async () => {
    await checkOTP({ email: email.trim().toLowerCase(), otp: otp.trim() })
      .unwrap()
      .then((res) => {
        console.log({ res });
        setHideSecondBtn(true);
        setHideThirdBtn(false);
        setMessage({
          text: i18n.t("ForgotPasswordDialog.enterNewPassword"),
        });
      })
      .catch((err) => {
        console.log(err);
        setMessage({ type: "error", text: err.data.message });
      });
  };

  const handleChangePasswordOTP = async () => {
    await changeOTP({
      email: email.trim().toLowerCase(),
      password: newPass.trim(),
    })
      .unwrap()
      .then((res) => {
        console.log({ res });
        setHideThirdBtn(true);
        dispatch(
          addMessage(i18n.t("ForgotPasswordDialog.passwordChangeSuccess"))
        );
				handleClose()
      })
      .catch((err) => {
        console.log(err);
        setMessage({ type: "error", text: err.data.message });
      });
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  return (
    <BottomSheet
      index={-1}
      ref={sheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={handleClose}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={tw`p-4 flex-1 justify-between`}>
        <View>
          <Text style={tw`text-lg text-center`}>
            {i18n.t("ForgotPasswordDialog.resetPasswordTitle")}
          </Text>
          {message && (
            <Text
              style={tw`${
                message?.type === "error" ? "text-red-500" : "text-gray-400"
              } mt-2`}
            >
              {message?.text}
            </Text>
          )}
          {!hideFirstBtn && (
            <CustomTextInput
              style="mt-2"
              label="Email"
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
            />
          )}
          {!hideSecondBtn && (
            <CustomTextInput
              style="mt-2"
              label={i18n.t("code")}
              placeholder={i18n.t("code")}
              value={otp}
              keyboardType="decimal-pad"
              onChangeText={handleOTPChange}
            />
          )}

          {!hideThirdBtn && (
            <CustomTextInput
              style="mt-2"
              label={i18n.t("password")}
              placeholder={i18n.t("password")}
              secureTextEntry
              onChangeText={handlePasswordChange}
              value={newPass}
            />
          )}
        </View>
        <View>
          {!hideFirstBtn && (
            <CustomGradientButton
              style="mt-6"
              onPress={handleGeneratePassword}
              disabled={email.length <= 0 || isLoadingGenerate}
              loading={isLoadingGenerate}
            >
              {i18n.t("submit")}
            </CustomGradientButton>
          )}
          {!hideSecondBtn && (
            <CustomGradientButton
              style="mt-6"
              onPress={handleCheckOTP}
              disabled={otp.length <= 0 || isLoadingCheckOTP}
              loading={isLoadingCheckOTP}
            >
              {i18n.t("submit")}
            </CustomGradientButton>
          )}
          {!hideThirdBtn && (
            <CustomGradientButton
              style="mt-6"
              onPress={handleChangePasswordOTP}
              disabled={newPass.length < 6 || isLoadingChangeOTP}
              loading={isLoadingChangeOTP}
            >
              {i18n.t("change")}
            </CustomGradientButton>
          )}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}
