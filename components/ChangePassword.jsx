import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import {
	Text
} from "react-native-paper";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import * as Yup from "yup";
import i18n from "../i18n";
import { useUpdateMyPasswordMutation } from "../redux/services/authorized.service";
import { addMessage } from "../redux/slices/auth";
import { CustomButton, CustomTextInput } from "./ui";

const ChangePassSchema = Yup.object().shape({
  old_password: Yup.string().required(i18n.t("Errors.required")),
  password: Yup.string()
    .min(6, i18n.t("Errors.wrong_password_format"))
    .required(i18n.t("Errors.required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], i18n.t("Errors.passwords_do_not_match"))
    .required(i18n.t("Errors.required")),
});

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [updatePassword, { isLoading, isSuccess, isError, error }] =
    useUpdateMyPasswordMutation();

  const handleSubmitUpdate = async (values, { resetForm }) => {
    const payload = {
      old_password: values.old_password,
      password: values.password,
    };

    try {
      const response = await updatePassword(payload);
      if (response?.data) {
        dispatch(addMessage(i18n.t("Successes.updated")));
				resetForm()
      }
    } catch (error) {
      console.log("Update", { error });
      dispatch(addMessage(error.respose.error.data.message));
    }
  };

  return (
    <Formik
      validationSchema={ChangePassSchema}
      initialValues={{
        old_password: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={handleSubmitUpdate}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View>
          <View style={tw`px-5`}>
            <Text style={tw`text-gray-400`}>
              {i18n.t("ChangePassword.change_password")}
            </Text>
          </View>
          <View style={tw`mt-2 p-5 bg-white`}>
            <CustomTextInput
              label={i18n.t("ChangePassword.old_password")}
              onBlur={handleBlur("old_password")}
              onChangeText={handleChange("old_password")}
              value={values.old_password}
              isError={!!errors.old_password && !!touched.old_password}
              errorText={errors?.old_password}
              placeholder={i18n.t("ChangePassword.old_password")}
              secureTextEntry
            />

            <CustomTextInput
              style="mt-4"
              label={i18n.t("ChangePassword.new_password")}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              value={values.password}
              isError={!!errors.password && !!touched.password}
              errorText={errors?.password}
              placeholder={i18n.t("ChangePassword.new_password")}
              secureTextEntry
            />

            <CustomTextInput
              style="mt-4"
              label={i18n.t("confirm_password")}
              onBlur={handleBlur("confirmPassword")}
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
              isError={!!errors.confirmPassword && !!touched.confirmPassword}
              errorText={errors?.confirmPassword}
              placeholder={i18n.t("confirm_password")}
              secureTextEntry
            />

            <CustomButton
              style="mt-4"
              onPress={handleSubmit}
              disabled={isLoading}
              loading={isLoading}
            >
              {i18n.t("update")}
            </CustomButton>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ChangePassword;
