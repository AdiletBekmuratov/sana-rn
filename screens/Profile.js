import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect, useState } from "react";
import { Linking, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import i18n from "../i18n";
import {
  useGetMeQuery,
  useGetQuestionQuantityQuery,
  useUpdateQuestionQuantityMutation,
} from "../redux/services/authorized.service";

export default function Profile({ navigation }) {
  const { data, error, isLoading, isError } = useGetMeQuery();
  const {
    data: questionQuantityData,
    error: questionQuantityErr,
    isLoading: questionQuantityIsLoading,
  } = useGetQuestionQuantityQuery();
  const [updateQQ] = useUpdateQuestionQuantityMutation();
  const [sliderOneValue, setSliderOneValue] = useState([10]);

  useEffect(() => {
    console.log(questionQuantityData);

    setSliderOneValue([questionQuantityData?.quantity_of_questions ?? 10]);
  }, [questionQuantityData]);

  const sliderOneValuesChange = (values) => setSliderOneValue(values);

  const sliderOneValuesChangeFinish = async (values) => {
    try {
      await updateQQ({
        quantity_of_questions: values[0],
      });
    } catch (error) {
      console.log("QQERR", error);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-between bg-gray-100`}>
      <Card>
        <Card.Content style={tw`items-center justify-between`}>
          <IconButton
            icon={"pen"}
            style={tw`absolute right-2 top-2`}
            onPress={() =>
              navigation.navigate("ChangeProfile", { userData: data })
            }
          />
          <MaterialIcons name="account-circle" size={100} color="gray" />
          <Text style={tw`text-xl font-bold text-center`}>
            {data.first_name} {data.last_name}
          </Text>
          <Text style={tw`text-lg`}>{data.email}</Text>
          <Text style={tw`text-lg underline`}>
            +7 ({data.phone.slice(0, 3)}) {data.phone.slice(3, 6)}-
            {data.phone.slice(6)}
          </Text>
        </Card.Content>
      </Card>
      <View style={tw`flex justify-center items-center`}>
        <Text>Кол-во вопросов: {sliderOneValue}</Text>
        <View style={tw`flex flex-row justify-center items-center`}>
          <Text>10</Text>
          <View style={tw`mx-5`}>
            <MultiSlider
              markerStyle={tw`p-2 bg-blue-600 rounded-full`}
              selectedStyle={tw`bg-blue-600`}
              min={10}
              max={100}
              step={5}
              values={sliderOneValue}
              smoothSnapped={true}
              snapped={true}
              onValuesChange={sliderOneValuesChange}
              onValuesChangeFinish={sliderOneValuesChangeFinish}
            />
          </View>
          <Text>100</Text>
        </View>

        <Button
          style={tw`w-full`}
          mode="contained"
          icon={"whatsapp"}
          onPress={() =>
            Linking.openURL(
              "https://api.whatsapp.com/send?phone=77023006177&text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5.%20'Sana'%20%D2%9B%D0%BE%D1%81%D1%8B%D0%BC%D1%88%D0%B0%D1%81%D1%8B%20%D0%B6%D0%B0%D0%B9%D0%BB%D1%8B%20%D1%81%D2%B1%D1%80%D0%B0%D2%93%D1%8B%D0%BC%20%D0%B1%D0%B0%D1%80%20%D0%B5%D0%B4%D1%96."
            )
          }
        >
          {i18n.t("ProfileScreen.whatsapp")}
        </Button>
      </View>
    </View>
  );
}
