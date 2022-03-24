import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  HelperText,
  Snackbar,
  TextInput,
  Title,
} from "react-native-paper";
import tw from "twrnc";
import * as Yup from "yup";
import { auth, db } from "../firebase";
import { ref, update } from "firebase/database";

const ProfileUpdateSchema = Yup.object().shape({
  firstName: Yup.string().required("Міндетті өріс"),
  lastName: Yup.string().required("Міндетті өріс"),
  phoneNumber: Yup.string()
    .required("Міндетті өріс")
    .min(11, "Қате телефон форматы")
    .max(11, "Қате телефон форматы"),
  password: Yup.string().required("Міндетті өріс"),
});

const ChangeMainInfo = ({ userData }) => {
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const onSubmitUpdate = async (value, { resetForm }) => {
    userData = {
      ...userData,
      firstName: value.firstName,
      lastName: value.lastName,
      phoneNumber: value.phoneNumber,
    };
    setLoading(true);
    const credential = EmailAuthProvider.credential(
      userData.email,
      value.password
    );
    await reauthenticateWithCredential(auth.currentUser, credential)
      .then(async (userCredential) => {
        await update(ref(db, "users/" + auth.currentUser.uid), userData)
          .then((res) => {
            setMessage("Профиль сәтті өзгертілді");
            setVisible(true);
          })
          .catch((err) => {
            setMessage("Профиль өзгерту барысында қате. Кейінірек көріңіз");
          });
      })
      .catch((error) => {
        setMessage("Құпия сөз қате терілді");
        setVisible(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Content>
          <Formik
            validationSchema={ProfileUpdateSchema}
            initialValues={{
              firstName: userData.firstName,
              lastName: userData.lastName,
              phoneNumber: userData.phoneNumber,
              password: "",
            }}
            onSubmit={onSubmitUpdate}
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
                <Title style={tw`mb-4`}>Негізгі ақпарат</Title>
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
                  label="Тегі"
                  mode="outlined"
                  dense={true}
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
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  value={values.password}
                  left={<TextInput.Icon name={"asterisk"} />}
                  error={!!errors.password && !!touched.password}
                />
                <HelperText
                  style={tw`mb-4`}
                  type="error"
                  visible={!!errors.password && !!touched.password}
                >
                  {errors.password}
                </HelperText>

                <Button
                  loading={loading}
                  disabled={loading}
                  mode="contained"
                  onPress={handleSubmit}
                  color="#002C67"
                >
                  Өзгерту
                </Button>
              </View>
            )}
          </Formik>
        </Card.Content>
      </Card>
      <View style={tw`w-full`}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </>
  );
};

export default ChangeMainInfo;
