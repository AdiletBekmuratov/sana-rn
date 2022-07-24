import { MyProgressCard, RatingItem } from "@/components/RatingPage";
import Spinner from "@/components/Spinner";
import {
  useGetAllRatingQuery,
  useGetMyRatingQuery,
} from "@/redux/services/authorized.service";
import i18n from "@/utils/i18n";
import React, { useEffect } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";
import Icons from "@expo/vector-icons/MaterialCommunityIcons";

const RatingScreen = ({ navigation }) => {
  const {
    data: globalRating = {},
    isLoading,
    error,
    isError,
  } = useGetAllRatingQuery({
    lessonId: "",
    page: 1,
    size: 4,
  });

  const { data: myRating, isLoading: myRateLoading } = useGetMyRatingQuery();

  if (isLoading || myRateLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 justify-start bg-gray-100`}>
      <ScrollView>
        <View style={tw`px-5 pb-5`}>
          <MyProgressCard />
        </View>

        <View>
          <View style={tw`px-5`}>
            <Text style={tw`text-gray-400`}>
              {i18n.t("Rating.globalRating")}
            </Text>
          </View>
          <View style={tw`mt-2 p-5 bg-white`}>
            <ScrollView contentContainerStyle={tw`flex-grow`} horizontal={true}>
              <View style={tw`flex-1`}>
                <FlatList
                  data={globalRating?.data}
                  renderItem={({ item, index }) => (
                    <RatingItem
                      id={item.id}
                      isFriend={item.is_friend}
                      fullname={`${item.first_name} ${item.last_name}`}
                      place={index + 1}
                      top={
                        index === 0
                          ? "gold"
                          : index === 1
                          ? "silver"
                          : index === 2
                          ? "bronze"
                          : "none"
                      }
                      green={item.mastered_quantity}
                      blue={item.repeat_quantity}
                      red={item.wrong_quantity}
                      style={index !== 0 ? "mt-4" : ""}
                    />
                  )}
                />
              </View>
            </ScrollView>
            <View style={tw`mt-4 py-2 bg-[#DFF1FE] rounded-xl`}>
              <RatingItem
                fullname={`${myRating.first_name} ${myRating.last_name}`}
                place={myRating.my_place}
                top={"none"}
                green={myRating.mastered_quantity}
                blue={myRating.repeat_quantity}
                red={myRating.wrong_quantity}
                hideButton
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              style={tw`mt-6 flex-row items-center`}
              onPress={() => navigation.navigate("TopBarRatingStack")}
            >
              <Text style={tw`text-[#52AEF3]`}>Барлығын көру</Text>
              <Icons name="chevron-right" size={18} color={"#52AEF3"} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RatingScreen;
