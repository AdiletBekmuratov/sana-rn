import React from "react";
import { FlatList, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import i18n from "@/utils/i18n";
import {
  useGetFriendsRatingQuery,
  useGetMyRatingQuery,
  useRemoveFriendFromRatingMutation,
} from "@/redux/services/authorized.service";

export const FriendsRatingScreen = () => {
  const { data = [], isLoading } = useGetFriendsRatingQuery();

  const { data: myRating, isLoading: myRateLoading } = useGetMyRatingQuery();
  const [removeFriend] = useRemoveFriendFromRatingMutation();

  const removeFriendHandler = async (id) => {
    console.log(id);
    const response = await removeFriend(id);
    console.log({ response });
  };

  if (isLoading || myRateLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 pt-2 justify-between bg-gray-100`}>
      <FlatList
        style={tw`w-full`}
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item, index }) => (
          <Card style={tw`mt-2`}>
            <Card.Content>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Text style={tw`w-1/2`}>
                  {index + 1}
                  {")"} {item.first_name} {item.last_name}
                </Text>
                <View style={tw`flex flex-row justify-end items-center w-1/2`}>
                  <Text>
                    {i18n.t("Rating.mastered")}: {item.mastered_quantity}
                  </Text>
                  <View>
                    <IconButton
                      icon="account-minus"
                      style={tw`ml-2 bg-gray-200`}
                      onPress={() => removeFriendHandler(item.id)}
                    />
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      <Card style={tw`mt-2`}>
        <Card.Content>
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text style={tw`w-1/2`}>
              {myRating?.my_place}
              {")"} {myRating.first_name} {myRating.last_name}
            </Text>
            <Text>
              {i18n.t("Rating.mastered")}: {myRating.mastered_quantity}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
