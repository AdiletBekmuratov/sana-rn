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

const LoginSchema = Yup.object().shape({
  oldPass: Yup.string().required("Міндетті өріс"),
  newPass: Yup.string()
    .required("Міндетті өріс")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Құпия сөз кемінде 8 таңбадан, бір үлкен әріптен, бір кіші әріптен, бір саннан және бір ерекше регистрден тұруы керек(!@#$%^&*)"
    ),
});

const ChangePassword = ({ userData }) => {
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const onLogin = async (values, { resetForm }) => {};

  return (
    <>
      <Card>
        <Card.Content>
          <Formik
            validationSchema={LoginSchema}
            initialValues={{ oldPass: "", newPass: "" }}
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
                <Title style={tw`mb-4`}>Құпия сөз өзгерту</Title>

                <TextInput
                  label="Ескі құпия сөз"
                  mode="outlined"
                  activeOutlineColor="#002C67"
                  dense={true}
                  onBlur={handleBlur("oldPass")}
                  secureTextEntry
                  onChangeText={handleChange("oldPass")}
                  value={values.oldPass}
                  left={<TextInput.Icon name={"asterisk"} />}
                  error={!!errors.oldPass && !!touched.oldPass}
                />
                {!!errors.oldPass && !!touched.oldPass && (
                  <HelperText
                    type="error"
                    visible={!!errors.oldPass && !!touched.oldPass}
                  >
                    {errors.oldPass}
                  </HelperText>
                )}

                <TextInput
                  style={tw`mt-2`}
                  label="Жаңа құпия сөз"
                  mode="outlined"
                  activeOutlineColor="#002C67"
                  dense={true}
                  secureTextEntry
                  onBlur={handleBlur("newPass")}
                  onChangeText={handleChange("newPass")}
                  value={values.newPass}
                  left={<TextInput.Icon name={"lock"} />}
                  error={!!errors.newPass && !!touched.newPass}
                />
                {!!errors.newPass && !!touched.newPass && (
                  <HelperText
                    type="error"
                    visible={!!errors.newPass && !!touched.newPass}
                  >
                    {errors.newPass}
                  </HelperText>
                )}

                <Button
                  style={tw`mt-4`}
                  loading={loadingPassword}
                  disabled={loadingPassword}
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

export default ChangePassword;
