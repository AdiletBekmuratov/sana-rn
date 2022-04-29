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

const ProfileUpdateSchema = Yup.object().shape({
  first_name: Yup.string().required("Міндетті өріс"),
  last_name: Yup.string().required("Міндетті өріс"),
  phone: Yup.string().required("Міндетті өріс"),
  password: Yup.string().required("Міндетті өріс"),
});

const ChangeMainInfo = ({ userData }) => {
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [unmaskedPhone, setUnmaskedPhone] = useState("");

  const onDismissSnackBar = () => setVisible(false);

  const onSubmitUpdate = async (values, { resetForm }) => {
    const data = {
      ...values,
      phone: unmaskedPhone,
    };
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
              phone: userData.phone,
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
                <Title style={tw`mb-4`}>Негізгі ақпарат</Title>
                <TextInput
                  label="Аты"
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
                  label="Телефон"
                  mode="outlined"
                  activeOutlineColor="#002C67"
                  dense={true}
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
