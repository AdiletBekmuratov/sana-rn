import { Formik } from "formik";
import { useState } from "react";
import { View } from "react-native";
import { Headline, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import * as Yup from "yup";
import PasswordReset from "@/components/PasswordReset";
import { CustomButton, CustomTextInput } from "@/components/ui";
import i18n from "@/utils/i18n";
import { login } from "@/redux/slices/auth.js";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email(i18n.t("Errors.email_wrong_format"))
    .required(i18n.t("Errors.required")),
  password: Yup.string().required(i18n.t("Errors.required")),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visibleDialog, setVisibleDialog] = useState(false);

  const handleSubmit = (formValues, { resetForm }) => {
    const data = {
      ...formValues,
      username: formValues.username.toLowerCase(),
    };
    dispatch(login(data));
    resetForm();
  };

  const handleOpenDialog = () => {
    setVisibleDialog(true);
  };

  const handleCloseDialog = () => {
    setVisibleDialog(false);
  };

  return (
    <SafeAreaView
      style={tw`flex-1 p-5 justify-start w-full bg-white dark:bg-black pt-[80px]`}
    >
      <PasswordReset
        visibleDialog={visibleDialog}
        handleCloseDialog={handleCloseDialog}
      />

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
                onPress={() => handleOpenDialog()}
              >
                {i18n.t("LoginScreen.forgotPassword")}
              </Text>
            </View>

            <View>
              <CustomButton onPress={handleSubmit}>
                {i18n.t("LoginScreen.enter")}
              </CustomButton>
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
    </SafeAreaView>
  );
};

export default Login;
