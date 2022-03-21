import React from "react";
import { View } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  Text,
  TextInput,
} from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import tw from "twrnc";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Неправильный формат Email")
    .required("Обязательное поле для заполнения"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Пароль должен содержать минимум 8 символов, один верхний регистр, один нижний регистр, одну цифру и один символ специального регистра(!@#$%^&*)"
    )
    .required("Обязательное поле для заполнения"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Пароли не совпадают")
    .required("Обязательное поле для заполнения"),
});

const Register = ({ navigation }) => {
  const handleRegister = async (value) => {
    console.log(value);
  };

  return (
    <View style={tw`h-full flex-1 px-6 justify-center bg-gray-100`}>
      <Headline style={tw`font-bold mb-4 text-center uppercase`}>
        Регистрация
      </Headline>
      <Formik
        validationSchema={RegisterSchema}
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        onSubmit={handleRegister}
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
							keyboardType="email-address"
              onBlur={handleBlur("email")}
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

            <TextInput
              label="Подтвердить пароль"
              mode="outlined"
              secureTextEntry
              onBlur={handleBlur("confirmPassword")}
              onChangeText={handleChange("confirmPassword")}
              value={values.confirmPassword}
              left={<TextInput.Icon name={"lock"} />}
              error={!!errors.confirmPassword && !!touched.confirmPassword}
            />
            <HelperText
              style={tw`mb-4`}
              type="error"
              visible={!!errors.confirmPassword && !!touched.confirmPassword}
            >
              {errors.confirmPassword}
            </HelperText>

            <Button mode="contained" onPress={handleSubmit}>
              Начать
            </Button>
          </View>
        )}
      </Formik>
      <Text
        style={tw`mt-6 text-center`}
        onPress={() => navigation.replace("Login")}
      >
        Уже есть аккаунт? Войти
      </Text>
    </View>
  );
};

export default Register;
