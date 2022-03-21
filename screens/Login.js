import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { View } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import tw from "twrnc";
import { auth } from "../firebase";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import Spinner from "../components/Spinner";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный формат Email")
    .required("Обязательное поле для заполнения"),
  password: Yup.string().required("Обязательное поле для заполнения"),
});

const Login = ({ navigation }) => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onLogin = async (value) => {
    await signInWithEmailAndPassword(value.email, value.password);
		console.log(user);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-6 justify-center bg-gray-100`}>
      <Headline style={tw`font-bold mb-4 text-center uppercase`}>Вход</Headline>
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
              onBlur={handleBlur("email")}
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              value={values.email}
              left={<TextInput.Icon name={"email"} />}
              error={!!errors.email && !!touched.email}
            />
            <HelperText
              style={tw`mb-4`}
              type="error"
              visible={!!errors.email && !!touched.email}
            >
              {errors.email}
            </HelperText>

            <TextInput
              label="Пароль"
              mode="outlined"
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
  );
};

export default Login;
