import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { useEffect, useState } from "react";
import { Linking, ScrollView, View } from "react-native";
import { Headline, IconButton, Switch, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import i18n from "@/utils/i18n";
import {
  useGetMeQuery,
  useGetQuestionQuantityQuery,
  useUpdateQuestionQuantityMutation,
} from "@/redux/services/authorized.service";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ButtonGroup } from "@/components/ui";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/auth";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();

  const { data, error, isLoading, isError } = useGetMeQuery();
  const {
    data: questionQuantityData,
    error: questionQuantityErr,
    isLoading: questionQuantityIsLoading,
  } = useGetQuestionQuantityQuery();
  const [updateQQ] = useUpdateQuestionQuantityMutation();
  const [sliderOneValue, setSliderOneValue] = useState([10]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
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

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1`}>
      <LinearGradient
        style={{
          paddingTop: insets.top,
        }}
        colors={["#3BB6DF", "#3A9CE8"]}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 0.0, y: 1.0 }}
      >
        <View style={tw`h-[80px] p-5 relative items-center justify-center`}>
          <Headline style={tw`text-xl text-white`}>
            {i18n.t("ProfileStack.profile")}
          </Headline>
          <IconButton
            icon={"logout"}
            style={tw`absolute right-0`}
            color="#fff"
            onPress={() => handleLogout()}
          />
        </View>
        <View style={tw`justify-center items-center p-5 pt-0`}>
          <Text style={tw`text-white text-2xl font-bold`}>
            {data?.first_name} {data?.last_name}
          </Text>
          <Text style={tw`text-white text-lg mt-2`}>{data?.email}</Text>
          <Text style={tw`text-white text-lg mt-2`}>
            +7 ({data?.phone?.slice(0, 3)}) {data?.phone?.slice(3, 6)}-
            {data?.phone?.slice(6)}
          </Text>
        </View>
      </LinearGradient>
      <View style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`pb-5`}>
          <View style={tw`p-5`}>
            <ButtonGroup
              buttons={[
                {
                  children: <Text>Жеке мәліметті өзгерту</Text>,
                  onPress: () =>
                    navigation.navigate("ChangeProfile", { userData: data }),
                },
                {
                  children: <Text>Күніне меңгеру минимумы</Text>,
                  onPress: () => console.log("Hello2"),
                },
              ]}
            />

            <Text style={tw`mt-6 text-gray-400`}>Дыбыстар мен діріл</Text>
            <ButtonGroup
              containerStyle="mt-2"
              buttons={[
                {
                  children: (
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <Text>Музыка</Text>
                      <Switch value={true} style={tw`-my-2`} />
                    </View>
                  ),
                },
                {
                  children: (
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <Text>Діріл</Text>
                      <Switch value={true} style={tw`-my-2`} />
                    </View>
                  ),
                },
                {
                  children: (
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <Text>Дыбыс</Text>
                      <Switch value={true} style={tw`-my-2`} />
                    </View>
                  ),
                },
              ]}
            />

            <Text style={tw`mt-6 text-gray-400`}>Кері байланыс</Text>
            <ButtonGroup
              containerStyle="mt-2"
              buttons={[
                {
                  children: (
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <Text>Sana бағасы</Text>
                      <View style={tw`flex flex-row justify-end flex-1`}>
                        <IconButton
                          icon={"star"}
                          color="#d8d8d8"
                          style={tw`-mx-1 -my-2`}
                        />
                        <IconButton
                          icon={"star"}
                          color="#d8d8d8"
                          style={tw`-mx-1 -my-2`}
                        />
                        <IconButton
                          icon={"star"}
                          color="#d8d8d8"
                          style={tw`-mx-1 -my-2`}
                        />
                        <IconButton
                          icon={"star"}
                          color="#d8d8d8"
                          style={tw`-mx-1 -my-2`}
                        />
                        <IconButton
                          icon={"star"}
                          color="#d8d8d8"
                          style={tw`-mx-1 -my-2`}
                        />
                      </View>
                    </View>
                  ),
                  onPress: () => console.log("Rate"),
                },
                {
                  children: <Text>{i18n.t("ProfileScreen.whatsapp")}</Text>,
                  onPress: () =>
                    Linking.openURL(
                      "https://api.whatsapp.com/send?phone=77023006177&text=%D0%A1%D3%99%D0%BB%D0%B5%D0%BC%D0%B5%D1%82%D1%81%D1%96%D0%B7%20%D0%B1%D0%B5.%20'Sana'%20%D2%9B%D0%BE%D1%81%D1%8B%D0%BC%D1%88%D0%B0%D1%81%D1%8B%20%D0%B6%D0%B0%D0%B9%D0%BB%D1%8B%20%D1%81%D2%B1%D1%80%D0%B0%D2%93%D1%8B%D0%BC%20%D0%B1%D0%B0%D1%80%20%D0%B5%D0%B4%D1%96."
                    ),
                },
              ]}
            />
          </View>
        </ScrollView>
      </View>
    </View>
    // <View style={tw`h-full flex-1 px-5 pb-5 justify-between bg-gray-100`}>
    //   <Card>
    //     <Card.Content style={tw`items-center justify-between`}>
    //       <IconButton
    //         icon={"pen"}
    //         style={tw`absolute right-2 top-2`}
    //         onPress={() =>
    //           navigation.navigate("ChangeProfile", { userData: data })
    //         }
    //       />
    //       <MaterialIcons name="account-circle" size={100} color="gray" />
    //       <Text style={tw`text-xl font-bold text-center`}>
    //         {data?.first_name} {data?.last_name}
    //       </Text>
    //       <Text style={tw`text-lg`}>{data?.email}</Text>
    //       <Text style={tw`text-lg underline`}>

    //       </Text>
    //     </Card.Content>
    //   </Card>
    //   <View style={tw`flex justify-center items-center`}>
    //     <Text>{i18n.t("ProfileScreen.number_of_questions")} {sliderOneValue}</Text>
    //     <View style={tw`flex flex-row justify-center items-center`}>
    //       <Text>10</Text>
    //       <View style={tw`mx-5`}>
    //         <MultiSlider
    //           markerStyle={tw`p-2 bg-blue-600 rounded-full`}
    //           selectedStyle={tw`bg-blue-600`}
    //           min={10}
    //           max={100}
    //           step={5}
    //           values={sliderOneValue}
    //           smoothSnapped={true}
    //           snapped={true}
    //           onValuesChange={sliderOneValuesChange}
    //           onValuesChangeFinish={sliderOneValuesChangeFinish}
    //         />
    //       </View>
    //       <Text>100</Text>
    //     </View>

    //   </View>
    // </View>
  );
}
