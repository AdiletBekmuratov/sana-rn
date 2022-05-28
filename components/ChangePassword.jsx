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
import i18n from "../i18n";
import { useUpdateMyPasswordMutation } from "../redux/services/authorized.service";

const ChangePassSchema = Yup.object().shape({
  old_password: Yup.string().required(i18n.t("Errors.required")),
  password: Yup.string()
    .min(6, i18n.t("Errors.wrong_password_format"))
    .required(i18n.t("Errors.required")),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], i18n.t("Errors.passwords_do_not_match"))
    .required(i18n.t("Errors.required")),
});

const ChangePassword = ({ userData, setVisible, setMessage }) => {
  const [passwordOldVisible, setPasswordOldVisible] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(true);

  const [updatePassword, { isLoading, isSuccess, isError, error }] =
    useUpdateMyPasswordMutation();

  const handleSubmitUpdate = async (values, { resetForm }) => {
    const payload = {
      old_password: values.old_password,
      password: values.password,
    };

    try {
      const response = await updatePassword(payload);
      console.log({ response });
      if (response?.data) {
        setMessage(i18n.t("Successes.updated"));
        setVisible(true);
      }
    } catch (error) {
      console.log("Update", { error });
      setMessage(error);
      setVisible(true);
    }
  };

  return (
    <>
      <Card>
        <Card.Content>
          <Formik
            validationSchema={ChangePassSchema}
            initialValues={{
              old_password: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={handleSubmitUpdate}
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
                <Title style={tw`mb-4`}>
                  {i18n.t("ChangePassword.change_password")}
                </Title>

                <TextInput
                  label={i18n.t("ChangePassword.old_password")}
                  mode="outlined"
                  dense={true}
                  onBlur={handleBlur("old_password")}
                  secureTextEntry={passwordOldVisible}
                  onChangeText={handleChange("old_password")}
                  value={values.old_password}
                  right={
                    <TextInput.Icon
                      name={passwordOldVisible ? "eye" : "eye-off"}
                      onPress={() => setPasswordOldVisible(!passwordOldVisible)}
                    />
                  }
                  left={<TextInput.Icon name={"asterisk"} />}
                  error={!!errors.old_password && !!touched.old_password}
                />
                {!!errors.old_password && !!touched.old_password && (
                  <HelperText
                    type="error"
                    visible={!!errors.old_password && !!touched.old_password}
                  >
                    {errors.old_password}
                  </HelperText>
                )}

                <TextInput
                  style={tw`mt-2`}
                  label={i18n.t("ChangePassword.new_password")}
                  mode="outlined"
                  dense={true}
                  secureTextEntry={passwordVisible}
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  left={<TextInput.Icon name={"lock"} />}
                  right={
                    <TextInput.Icon
                      name={passwordVisible ? "eye" : "eye-off"}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
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
                  label={i18n.t("confirm_password")}
                  mode="outlined"
                  dense={true}
                  secureTextEntry={passwordConfirmVisible}
                  onBlur={handleBlur("confirmPassword")}
                  onChangeText={handleChange("confirmPassword")}
                  value={values.confirmPassword}
                  left={<TextInput.Icon name={"lock"} />}
                  right={
                    <TextInput.Icon
                      name={passwordConfirmVisible ? "eye" : "eye-off"}
                      onPress={() =>
                        setPasswordConfirmVisible(!passwordConfirmVisible)
                      }
                    />
                  }
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
                  loading={isLoading}
                  disabled={isLoading}
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
    </>
  );
};

export default ChangePassword;
