import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import MaskInput from "react-native-mask-input";
import { Button, Card, HelperText, TextInput, Title } from "react-native-paper";
import tw from "twrnc";
import * as Yup from "yup";
import { API_URL } from "../redux/http";
import { useUpdateMeMutation } from "../redux/services/authorized.service";
import i18n from "../i18n";

const ProfileUpdateSchema = Yup.object().shape({
  first_name: Yup.string().required(i18n.t("Errors.required")),
  last_name: Yup.string().required(i18n.t("Errors.required")),
  phone: Yup.string().required(i18n.t("Errors.required")),
  password: Yup.string().required(i18n.t("Errors.required")),
});

const ChangeMainInfo = ({ userData, setVisible, setMessage }) => {
  const [updateMe, { isLoading, isSuccess, isError, error }] =
    useUpdateMeMutation();

  const [unmaskedPhone, setUnmaskedPhone] = useState(userData.phone);

  const onSubmitUpdate = async (values, { resetForm }) => {
    const loginData = {
      username: userData.email,
      password: values.password,
    };

    try {
      const response = await axios.post(API_URL + "/user/login/", loginData);

      if (response.data) {
        const updateData = {
          first_name: values.first_name,
          last_name: values.last_name,
          phone: unmaskedPhone,
          email: userData.email,
        };
        try {
          const response2 = await updateMe(updateData);
          if (response2?.data) {
            setMessage(i18n.t("Successes.updated"));
            setVisible(true);
          }
        } catch (error) {
          console.log("Update", { error });
          setMessage(error);
          setVisible(true);
        }
      }
    } catch (error) {
      console.log("ReLogin", { error });
      setMessage(
        error.response.status === 401
          ? i18n.t("Errors.wrong_password")
          : error.message
      );
      setVisible(true);
    }
  };

  return (
    <>
      <Card>
        <Card.Content>
          <Formik
            validationSchema={ProfileUpdateSchema}
            initialValues={{
              first_name: userData.first_name,
              last_name: userData.last_name,
              phone: "7" + userData.phone,
              email: userData.email,
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
              setFieldValue,
            }) => (
              <View>
                <Title style={tw`mb-4`}>{i18n.t("ChangeMainInfo.title")}</Title>
                <TextInput
                  label={i18n.t("first_name")}
                  mode="outlined"
                  dense={true}
                  activeOutlineColor="#002C67"
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
                  label={i18n.t("last_name")}
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
                  label={i18n.t("phone")}
                  mode="outlined"
                  activeOutlineColor="#002C67"
                  dense={true}
                  value={values.phone}
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
                  label={i18n.t("confirm_password")}
                  mode="outlined"
                  activeOutlineColor="#002C67"
                  dense={true}
                  onBlur={handleBlur("password")}
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  value={values.password}
                  left={<TextInput.Icon name={"asterisk"} />}
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
                  loading={isLoading}
                  disabled={isLoading}
                  mode="contained"
                  onPress={handleSubmit}
                  color="#002C67"
                >
                  {i18n.t("update")}
                </Button>
              </View>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </>
  );
};

export default ChangeMainInfo;
