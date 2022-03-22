import { Formik } from "formik";
import * as Yup from "yup";
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
import tw from "twrnc";
import { auth } from "../firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Spinner from "../components/Spinner";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Қате e-mail форматы")
    .required("Міндетті өріс"),
  password: Yup.string().required("Міндетті өріс"),
});

const Login = ({ navigation }) => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    if (!!error) {
      setVisible(true);
    }
  }, [error]);

  const onLogin = async (value) => {
    await signInWithEmailAndPassword(value.email, value.password);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 justify-end bg-gray-100`}>
      <View style={tw`flex-1 justify-center`}>
        <Headline style={tw`font-bold mb-4 text-center uppercase`}>
          Вход
        </Headline>
        <Formik
          validationSchema={LoginSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={onLogin}
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
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                onChangeText={handleChange("email")}
                value={values.email}
                left={<TextInput.Icon name={"email"} />}
                error={!!errors.email && !!touched.email}
              />
              <HelperText
                type="error"
                visible={!!errors.email && !!touched.email}
              >
                {errors.email}
              </HelperText>

              <TextInput
                label="Пароль"
                mode="outlined"
                dense={true}
                secureTextEntry
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                left={<TextInput.Icon name={"lock"} />}
                error={!!errors.password && !!touched.password}
              />
              <HelperText
                style={tw`mb-4`}
                type="error"
                visible={!!errors.password && !!touched.password}
              >
                {errors.password}
              </HelperText>

              <Button mode="contained" onPress={handleSubmit}>
                Войти
              </Button>
            </View>
          )}
        </Formik>
        <Text
          style={tw`mt-6 text-center`}
          onPress={() => navigation.replace("Register")}
        >
          Еще нет аккаунта? Зарегистрироваться
        </Text>
      </View>

      <View style={tw`w-full`}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {error?.code}
        </Snackbar>
      </View>
    </View>
  );
};

export default Login;
