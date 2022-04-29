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
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import tw from "twrnc";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import MaskInput from "react-native-mask-input";
import { register } from "../redux/slices/auth";

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Қате e-mail форматы").required("Міндетті өріс"),
  first_name: Yup.string().required("Міндетті өріс"),
  last_name: Yup.string().required("Міндетті өріс"),
  phone: Yup.string().required("Міндетті өріс"),
  // .min(10, "Қате телефон форматы")
  // .max(11, "Қате телефон форматы"),
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
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [unmaskedPhone, setUnmaskedPhone] = useState("");

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!!message) {
      setVisible(true);
    }
  }, [message]);

  const onDismissSnackBar = () => setVisible(false);

  const handleRegister = (formValues, { resetForm }) => {
    delete formValues.confirmPassword;
    const data = {
      ...formValues,
      phone: unmaskedPhone,
    };
    console.log(data);
    dispatch(register(data));
    resetForm();
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <SafeAreaView style={tw`h-full flex-1 p-5 justify-center bg-gray-100`}>
      <View style={tw`flex-1 justify-center`}>
        <Headline style={tw`font-bold mb-4 text-center uppercase`}>
          Регистрация
        </Headline>
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
            <View>
              <TextInput
                label="Email"
                mode="outlined"
                activeOutlineColor="#002C67"
                keyboardType="email-address"
                dense={true}
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                value={values.email}
                left={<TextInput.Icon name={"email"} />}
                error={!!errors.email && !!touched.email}
              />
              {!!errors.email && !!touched.email && (
                <HelperText
                  type="error"
                  visible={!!errors.email && !!touched.email}
                >
                  {errors.email}
                </HelperText>
              )}

              <TextInput
                style={tw`mt-2`}
                label="Аты"
                mode="outlined"
                activeOutlineColor="#002C67"
                dense={true}
                onBlur={handleBlur("first_name")}
                onChangeText={handleChange("first_name")}
                value={values.first_name}
                left={<TextInput.Icon name={"account"} />}
                error={!!errors.first_name && !!touched.first_name}
              />
              {!!errors.first_name && !!touched.first_name && (
                <HelperText
                  type="error"
                  visible={!!errors.first_name && !!touched.first_name}
                >
                  {errors.first_name}
                </HelperText>
              )}

              <TextInput
                style={tw`mt-2`}
                label="Тегі"
                mode="outlined"
                activeOutlineColor="#002C67"
                dense={true}
                onBlur={handleBlur("last_name")}
                onChangeText={handleChange("last_name")}
                value={values.last_name}
                left={<TextInput.Icon name={"account"} />}
                error={!!errors.last_name && !!touched.last_name}
              />
              {!!errors.last_name && !!touched.last_name && (
                <HelperText
                  type="error"
                  visible={!!errors.last_name && !!touched.last_name}
                >
                  {errors.last_name}
                </HelperText>
              )}

              <TextInput
                style={tw`mt-2`}
                label="Ұялы телефон"
                mode="outlined"
                activeOutlineColor="#002C67"
                dense={true}
                keyboardType="phone-pad"
                left={<TextInput.Icon name={"phone"} />}
                error={!!errors.phone && !!touched.phone}
                render={(props) => (
                  <MaskInput
                    {...props}
                    value={values.phone}
                    onBlur={handleBlur("phone")}
                    onChangeText={(val, unmasked) => {
                      setFieldValue("phone", val);
                      setUnmaskedPhone(unmasked);
                    }}
                    mask={[
                      "+",
                      "7",
                      " ",
                      "(",
                      /\d/,
                      /\d/,
                      /\d/,
                      ")",
                      " ",
                      /\d/,
                      /\d/,
                      /\d/,
                      "-",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                    prefix="+7 "
                  />
                )}
              />
              {!!errors.phone && !!touched.phone && (
                <HelperText
                  type="error"
                  visible={!!errors.phone && !!touched.phone}
                >
                  {errors.phone}
                </HelperText>
              )}

              <TextInput
                style={tw`mt-2`}
                label="Құпия сөз"
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

              <TextInput
                style={tw`mt-2`}
                label="Құпия сөзді растау"
                mode="outlined"
                activeOutlineColor="#002C67"
                dense={true}
                secureTextEntry
                onBlur={handleBlur("confirmPassword")}
                onChangeText={handleChange("confirmPassword")}
                value={values.confirmPassword}
                left={<TextInput.Icon name={"lock"} />}
                error={!!errors.confirmPassword && !!touched.confirmPassword}
              />
              {!!errors.confirmPassword && !!touched.confirmPassword && (
                <HelperText
                  type="error"
                  visible={
                    !!errors.confirmPassword && !!touched.confirmPassword
                  }
                >
                  {errors.confirmPassword}
                </HelperText>
              )}

              <Button
                style={tw`mt-4`}
                mode="contained"
                color="#002C67"
                onPress={handleSubmit}
              >
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
          {message}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default Register;
