import { Formik } from "formik";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Headline, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import * as Yup from "yup";
import { CustomButton, CustomTextInput } from "../components/ui";
import i18n from "../i18n";
import { register } from "../redux/slices/auth";
import { phoneMask } from "../utils/masks";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t("Errors.email_wrong_format"))
    .required(i18n.t("Errors.required")),
  first_name: Yup.string().required(i18n.t("Errors.required")),
  last_name: Yup.string().required(i18n.t("Errors.required")),
  phone: Yup.string().required(i18n.t("Errors.required")),
  password: Yup.string()
    .min(6, i18n.t("Errors.wrong_password_format"))
    .required(i18n.t("Errors.required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], i18n.t("Errors.passwords_do_not_match"))
    .required(i18n.t("Errors.required")),
});

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [unmaskedPhone, setUnmaskedPhone] = useState("");

  const handleRegister = (formValues, { resetForm }) => {
    delete formValues.confirmPassword;
    const data = {
      ...formValues,
      phone: unmaskedPhone,
      email: formValues.email.toLowerCase(),
    };
    dispatch(register(data));
    resetForm();
  };

  return (
    <SafeAreaView
      style={tw`flex-1 p-5 justify-start bg-white dark:bg-black pt-[80px]`}
    >
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{
          test_types: [1],
          email: "",
          first_name: "",
          last_name: "",
          phone: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <View style={tw`flex-1 justify-between`}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <Headline style={tw`font-bold mb-4 text-center uppercase`}>
                {i18n.t("RegisterScreen.register")}
              </Headline>
              <CustomTextInput
                label={"Email"}
                onBlur={handleBlur("email")}
                onChangeText={(val) => setFieldValue("email", val.trim())}
                value={values.email}
                isError={!!errors.email && !!touched.email}
                errorText={errors?.email}
                placeholder={"Email"}
              />

              <CustomTextInput
                style={`mt-4`}
                label={i18n.t("first_name")}
                onBlur={handleBlur("first_name")}
                onChangeText={handleChange("first_name")}
                value={values.first_name}
                isError={!!errors.first_name && !!touched.first_name}
                errorText={errors?.first_name}
                placeholder={i18n.t("first_name")}
              />

              <CustomTextInput
                style={`mt-4`}
                label={i18n.t("last_name")}
                onBlur={handleBlur("last_name")}
                onChangeText={handleChange("last_name")}
                value={values.last_name}
                isError={!!errors.last_name && !!touched.last_name}
                errorText={errors?.last_name}
                placeholder={i18n.t("last_name")}
              />

              <CustomTextInput
                style={`mt-4`}
                label={i18n.t("phone")}
                value={values.phone}
                onBlur={handleBlur("phone")}
                onChangeText={(val, unmasked) => {
                  setFieldValue("phone", val);
                  setUnmaskedPhone(unmasked);
                }}
                mask={phoneMask}
                keyboardType="phone-pad"
                isError={!!errors.phone && !!touched.phone}
                errorText={errors?.phone}
                placeholder={i18n.t("phone")}
              />

              <CustomTextInput
                style={"mt-4"}
                label={i18n.t("password")}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                isError={!!errors.password && !!touched.password}
                errorText={errors?.password}
                placeholder={i18n.t("password")}
                secureTextEntry
              />

              <CustomTextInput
                style={"mt-4"}
                label={i18n.t("confirm_password")}
                onBlur={handleBlur("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                isError={!!errors.confirmPassword && !!touched.confirmPassword}
                errorText={errors?.confirmPassword}
                placeholder={i18n.t("confirm_password")}
                secureTextEntry
              />
            </ScrollView>
            <View style={tw`mt-4`}>
              <CustomButton onPress={handleSubmit}>
                {i18n.t("RegisterScreen.enter")}
              </CustomButton>
              <Text
                style={tw`mt-6 text-center`}
                onPress={() => navigation.replace("Login")}
              >
                {i18n.t("RegisterScreen.hasAccount")}
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Register;
