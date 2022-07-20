import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { View } from "react-native";
import MaskInput from "react-native-mask-input";
import {
  Button,
  Card,
  HelperText,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import tw from "twrnc";
import * as Yup from "yup";
import { API_URL } from "../redux/http";
import { useUpdateMeMutation } from "../redux/services/authorized.service";
import i18n from "../i18n";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/slices/auth";
import { CustomButton, CustomTextInput } from "./ui";
import { phoneMask } from "../utils/masks";

const ProfileUpdateSchema = Yup.object().shape({
  first_name: Yup.string().required(i18n.t("Errors.required")),
  last_name: Yup.string().required(i18n.t("Errors.required")),
  phone: Yup.string().required(i18n.t("Errors.required")),
  password: Yup.string().required(i18n.t("Errors.required")),
});

const ChangeMainInfo = ({ userData }) => {
  const dispatch = useDispatch();
  const [updateMe, { isLoading, isSuccess, isError, error }] =
    useUpdateMeMutation();

  const [unmaskedPhone, setUnmaskedPhone] = useState(userData.phone);
  const [passwordVisible, setPasswordVisible] = useState(true);

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
            await dispatch(addMessage(i18n.t("Successes.updated")));
          }
        } catch (error) {
          console.log("Update", { error });
          await dispatch(addMessage(error));
        }
      }
    } catch (error) {
      console.log("ReLogin", { error });
      await dispatch(
        addMessage(
          error.response.status === 401
            ? i18n.t("Errors.wrong_password")
            : error.message
        )
      );
    }
  };

  return (
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
          <View style={tw`px-5`}>
            <Text style={tw`text-gray-400`}>
              {i18n.t("ChangeMainInfo.title")}
            </Text>
          </View>
          <View style={tw`mt-2 p-5 bg-white`}>
            <CustomTextInput
              label={i18n.t("first_name")}
              onBlur={handleBlur("first_name")}
              onChangeText={handleChange("first_name")}
              value={values.first_name}
              isError={!!errors.first_name && !!touched.first_name}
              errorText={errors?.first_name}
              placeholder={i18n.t("first_name")}
            />

            <CustomTextInput
              style="mt-4"
              label={i18n.t("last_name")}
              onBlur={handleBlur("last_name")}
              onChangeText={handleChange("last_name")}
              value={values.last_name}
              isError={!!errors.last_name && !!touched.last_name}
              errorText={errors?.last_name}
              placeholder={i18n.t("last_name")}
            />

            <CustomTextInput
              style={`mt-4`}
              label={i18n.t("phone")}
              value={values.phone}
              onBlur={handleBlur("phone")}
              onChangeText={(val, unmasked) => {
                setFieldValue("phone", val);
                setUnmaskedPhone(unmasked);
              }}
              mask={phoneMask}
              keyboardType="phone-pad"
              isError={!!errors.phone && !!touched.phone}
              errorText={errors?.phone}
              placeholder={i18n.t("phone")}
            />

            <CustomTextInput
              style={"mt-4"}
              label={i18n.t("confirm_password")}
              onBlur={handleBlur("password")}
              onChangeText={handleChange("password")}
              value={values.password}
              isError={!!errors.password && !!touched.password}
              errorText={errors?.password}
              placeholder={i18n.t("confirm_password")}
              secureTextEntry
            />

            <CustomButton
              style="mt-4"
              onPress={handleSubmit}
              disabled={isLoading}
              loading={isLoading}
            >
              {i18n.t("update")}
            </CustomButton>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default ChangeMainInfo;
