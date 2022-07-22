import PasswordReset from "@/components/PasswordReset";
import { CustomGradientButton, CustomTextInput } from "@/components/ui";
import { useAppDispatch } from "@/redux/hooks";
import { login } from "@/redux/slices/auth";
import i18n from "@/utils/i18n";
import { Formik } from "formik";
import { useCallback, useRef } from "react";
import { View } from "react-native";
import { Headline, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email(i18n.t("Errors.email_wrong_format"))
    .required(i18n.t("Errors.required")),
  password: Yup.string().required(i18n.t("Errors.required")),
});

export const LoginScreen = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const sheetRef = useRef(null);

  const handleSubmit = (formValues, { resetForm }) => {
    const data = {
      ...formValues,
      username: formValues.username.toLowerCase(),
    };
    dispatch(login(data));
    resetForm();
  };

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <SafeAreaView
      style={tw`flex-1 p-5 justify-start w-full bg-white dark:bg-black pt-[80px]`}
    >
      <Formik
        validationSchema={LoginSchema}
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
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
            <View>
              <Headline style={tw`font-bold mb-6 text-3xl`}>
                {i18n.t("LoginScreen.login")}
              </Headline>
              <CustomTextInput
                label={"Email"}
                onBlur={handleBlur("username")}
                onChangeText={(val) => setFieldValue("username", val.trim())}
                value={values.username}
                isError={!!errors.username && !!touched.username}
                errorText={errors?.username}
                placeholder={"Email"}
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
              <Text
                style={tw`mt-4 text-[#52AEF3]`}
                onPress={() => handleSnapPress(0)}
              >
                {i18n.t("LoginScreen.forgotPassword")}
              </Text>
            </View>

            <View>
              <CustomGradientButton onPress={handleSubmit}>
                {i18n.t("LoginScreen.enter")}
              </CustomGradientButton>
              <Text
                style={tw`mt-4 text-center`}
                onPress={() => navigation.replace("Register")}
              >
                {i18n.t("LoginScreen.noAccount")}
              </Text>
            </View>
          </View>
        )}
      </Formik>

      <PasswordReset sheetRef={sheetRef} handleClosePress={handleClosePress} />
    </SafeAreaView>
  );
};
