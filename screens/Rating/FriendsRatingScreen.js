import { RatingItem } from "@/components/RatingPage";
import Spinner from "@/components/Spinner";
import {
	useGetFriendsRatingQuery,
	useGetMyRatingQuery
} from "@/redux/services/authorized.service";
import React from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";

export const FriendsRatingScreen = () => {
  const { data = [], isLoading } = useGetFriendsRatingQuery();

  const { data: myRating, isLoading: myRateLoading } = useGetMyRatingQuery();

  if (isLoading || myRateLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 pt-6 pb-5 justify-between bg-gray-100`}>
      <FlatList
        contentContainerStyle={tw`px-5 pb-5`}
        data={data}
        keyExtractor={(item, index) => item.id + `-${index}-rating`}
        renderItem={({ item, index }) => (
          <RatingItem
            id={item.id}
            isFriend={true}
            fullname={`${item.first_name} ${item.last_name}`}
            place={index + 1}
            hideButton={item.is_friend}
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

      <View style={tw`px-5`}>
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
      </View>
    </View>
  );
};
