import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View, Linking } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import { login } from "../redux/slices/auth.js";
import i18n from "../i18n";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email(i18n.t("Errors.email_wrong_format"))
    .required(i18n.t("Errors.required")),
  password: Yup.string().required(i18n.t("Errors.required")),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (!!message) {
      setVisible(true);
    }
  }, [message]);

  const handleSubmit = (formValues, { resetForm }) => {
    const data = {
      ...formValues,
      username: formValues.username.toLowerCase(),
    };
    dispatch(login(data));
    resetForm();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={tw`h-full flex-1 p-5 justify-end bg-gray-100`}>
      <View style={tw`flex-1 justify-center`}>
        <Headline style={tw`font-bold mb-4 text-center uppercase`}>
          {i18n.t("LoginScreen.login")}
        </Headline>
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
          }) => (
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                dense={true}
                onBlur={handleBlur("username")}
                keyboardType="email-address"
                onChangeText={handleChange("username")}
                value={values.username}
                left={<TextInput.Icon name={"email"} />}
                error={!!errors.username && !!touched.username}
              />
              {!!errors.username && !!touched.username && (
                <HelperText
                  type="error"
                  visible={!!errors.username && !!touched.username}
                >
                  {errors.username}
                </HelperText>
              )}

              <TextInput
                style={tw`mt-2`}
                label={i18n.t("password")}
                mode="outlined"
                dense={true}
                secureTextEntry={passwordVisible}
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                left={<TextInput.Icon name={"lock"} />}
                error={!!errors.password && !!touched.password}
                right={
                  <TextInput.Icon
                    name={passwordVisible ? "eye" : "eye-off"}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
              {!!errors.password && !!touched.password && (
                <HelperText
                  type="error"
                  visible={!!errors.password && !!touched.password}
                >
                  {errors.password}
                </HelperText>
              )}

              <Button style={tw`mt-4`} mode="contained" onPress={handleSubmit}>
                {i18n.t("LoginScreen.enter")}
              </Button>
            </View>
          )}
        </Formik>
        <Text
          style={tw`mt-6 text-center`}
          onPress={() => navigation.replace("Register")}
        >
          {i18n.t("LoginScreen.noAccount")}
        </Text>

        <Button
          style={tw`w-full absolute bottom-0`}
          mode="contained"
          icon={"whatsapp"}
          onPress={() =>
            Linking.openURL(
              "https://api.whatsapp.com/send?phone=77023006177&text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5.%20'Sana'%20%D2%9B%D0%BE%D1%81%D1%8B%D0%BC%D1%88%D0%B0%D1%81%D1%8B%20%D0%B6%D0%B0%D0%B9%D0%BB%D1%8B%20%D1%81%D2%B1%D1%80%D0%B0%D2%93%D1%8B%D0%BC%20%D0%B1%D0%B0%D1%80%20%D0%B5%D0%B4%D1%96."
            )
          }
        >
          {i18n.t("ProfileScreen.whatsapp")}
        </Button>
      </View>

      <View style={tw`w-full`}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default Login;
