import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
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

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email(i18n.t("Errors.email_wrong_format"))
    .required(i18n.t("Errors.required")),
  password: Yup.string().required(i18n.t("Errors.required")),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

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
    dispatch(login(formValues));
    resetForm();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 p-5 justify-end bg-gray-100`}>
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
                activeOutlineColor="#002C67"
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
                activeOutlineColor="#002C67"
                dense={true}
                secureTextEntry
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                left={<TextInput.Icon name={"lock"} />}
                error={!!errors.password && !!touched.password}
              />
              {!!errors.password && !!touched.password && (
                <HelperText
                  type="error"
                  visible={!!errors.password && !!touched.password}
                >
                  {errors.password}
                </HelperText>
              )}

              <Button
                style={tw`mt-4`}
                mode="contained"
                color="#002C67"
                onPress={handleSubmit}
              >
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
    </View>
  );
};

export default Login;
