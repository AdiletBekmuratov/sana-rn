import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import { auth, db } from "../firebase";

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Қате e-mail форматы")
    .required("Міндетті өріс"),
  firstName: Yup.string().required("Міндетті өріс"),
  lastName: Yup.string().required("Міндетті өріс"),
  phoneNumber: Yup.string()
    .required("Міндетті өріс")
    .min(11, "Қате телефон форматы")
    .max(11, "Қате телефон форматы"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Құпия сөз кемінде 8 таңбадан, бір үлкен әріптен, бір кіші әріптен, бір саннан және бір ерекше регистрден тұруы керек(!@#$%^&*)"
    )
    .required("Міндетті өріс"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Құпия сөздер сәйкес келмейді")
    .required("Міндетті өріс"),
});

const Register = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const handleRegister = async (value) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        await set(ref(db, "users/" + user.uid), {
          email: value.email.trim(),
          fistName: value.firstName.trim(),
          lastName: value.lastName.trim(),
          phoneNumber: value.phoneNumber.trim(),
          isAdmin: false,
          dayCounter: new Date().valueOf(),
          dayCounterStarted: true,
          expirationDate: new Date().valueOf() + 259200000,
          points: {
            mistake: 0,
            taught: 0,
            challenge: 0,
          },
        });
      })
      .catch((error) => {
        setError(error.code);
        setVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={tw`h-full flex-1 px-5 justify-center bg-gray-100`}>
      <View style={tw`flex-1 justify-center`}>
        <Headline style={tw`font-bold mb-4 text-center uppercase`}>
          Регистрация
        </Headline>
        <Formik
          validationSchema={RegisterSchema}
          initialValues={{
            email: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
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
          }) => (
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                keyboardType="email-address"
                dense={true}
                onBlur={handleBlur("email")}
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
                label="Аты"
                mode="outlined"
                dense={true}
                onBlur={handleBlur("firstName")}
                onChangeText={handleChange("firstName")}
                value={values.firstName}
                left={<TextInput.Icon name={"account"} />}
                error={!!errors.firstName && !!touched.firstName}
              />
              <HelperText
                type="error"
                visible={!!errors.firstName && !!touched.firstName}
              >
                {errors.firstName}
              </HelperText>

              <TextInput
                label="Тегі"
                mode="outlined"
                dense={true}
                onBlur={handleBlur("lastName")}
                onChangeText={handleChange("lastName")}
                value={values.lastName}
                left={<TextInput.Icon name={"account"} />}
                error={!!errors.lastName && !!touched.lastName}
              />
              <HelperText
                type="error"
                visible={!!errors.lastName && !!touched.lastName}
              >
                {errors.lastName}
              </HelperText>

              <TextInput
                label="Ұялы телефон"
                mode="outlined"
                dense={true}
                keyboardType="phone-pad"
                onBlur={handleBlur("phoneNumber")}
                onChangeText={handleChange("phoneNumber")}
                value={values.phoneNumber}
                left={<TextInput.Icon name={"phone"} />}
                error={!!errors.phoneNumber && !!touched.phoneNumber}
              />
              <HelperText
                type="error"
                visible={!!errors.phoneNumber && !!touched.phoneNumber}
              >
                {errors.phoneNumber}
              </HelperText>

              <TextInput
                label="Құпия сөз"
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
                type="error"
                visible={!!errors.password && !!touched.password}
              >
                {errors.password}
              </HelperText>

              <TextInput
                label="Құпия сөзді растау"
                mode="outlined"
                dense={true}
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
      <View style={tw`w-full`}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {error}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default Register;
