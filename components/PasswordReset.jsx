import React, { useState } from "react";
import { Button, Dialog, Portal, Text, TextInput } from "react-native-paper";
import {
  useChangePasswordOTPMutation,
  useCheckOTPMutation,
  useGenerateOTPMutation,
} from "../redux/services/unauthorized.service";
import tw from "twrnc";
import i18n from "../i18n";

export default function PasswordReset({ visibleDialog, handleCloseDialog }) {
  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const [hideFirstBtn, setHideFirstBtn] = useState(false);
  const [hideSecondBtn, setHideSecondBtn] = useState(true);
  const [hideThirdBtn, setHideThirdBtn] = useState(true);

  const [passwordVisible, setPasswordVisible] = useState(true);

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
    handleCloseDialog();
    setHideFirstBtn(false);
    setHideSecondBtn(true);
    setHideThirdBtn(true);
    setMessage(null);
  };

  const handleGeneratePassword = async () => {
    await generateOTP({ email })
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
    await checkOTP({ email, otp })
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
    await changeOTP({ email, password: newPass })
      .unwrap()
      .then((res) => {
        console.log({ res });
        setHideThirdBtn(true);
        setMessage({
          text: i18n.t("ForgotPasswordDialog.passwordChangeSuccess"),
        });
      })
      .catch((err) => {
        console.log(err);
        setMessage({ type: "error", text: err.data.message });
      });
  };

  return (
    <Portal>
      <Dialog visible={visibleDialog} onDismiss={handleCloseDialog}>
        <Dialog.Title>
          {i18n.t("ForgotPasswordDialog.resetPasswordTitle")}
        </Dialog.Title>
        <Dialog.Content>
          {message && (
            <Text
              style={tw`${message?.type === "error" ? "text-red-500" : ""}`}
            >
              {message?.text}
            </Text>
          )}
          {!hideFirstBtn && (
            <TextInput
              label="Email"
              mode="outlined"
              dense={true}
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
            />
          )}
          {!hideSecondBtn && (
            <TextInput
              label={i18n.t("code")}
              mode="outlined"
              dense={true}
              keyboardType="decimal-pad"
              value={otp}
              onChangeText={handleOTPChange}
            />
          )}

          {!hideThirdBtn && (
            <TextInput
              label={i18n.t("password")}
              mode="outlined"
              dense={true}
              secureTextEntry={passwordVisible}
              onChangeText={handlePasswordChange}
              value={newPass}
              right={
                <TextInput.Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
          )}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleClose}>{i18n.t("close")}</Button>
          {!hideFirstBtn && (
            <Button
              onPress={handleGeneratePassword}
              disabled={email.length <= 0 || isLoadingGenerate}
              loading={isLoadingGenerate}
            >
              {i18n.t("submit")}
            </Button>
          )}
          {!hideSecondBtn && (
            <Button
              onPress={handleCheckOTP}
              disabled={otp.length <= 0 || isLoadingCheckOTP}
              loading={isLoadingCheckOTP}
            >
              {i18n.t("submit")}
            </Button>
          )}
          {!hideThirdBtn && (
            <Button
              onPress={handleChangePasswordOTP}
              disabled={newPass.length < 6 || isLoadingChangeOTP}
              loading={isLoadingChangeOTP}
            >
              {i18n.t("change")}
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
