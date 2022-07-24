import { GestureResponderEvent, View } from "react-native";
import React, { FC, useState } from "react";
import { ActivityIndicator, Text } from "react-native-paper";
import { CustomIconButton } from "../ui";
import tw from "twrnc";
import { LinearGradient } from "expo-linear-gradient";
import grads from "@/utils/grads";
import {
  useAddFriendToRatingMutation,
  useRemoveFriendFromRatingMutation,
} from "@/redux/services/authorized.service";

interface IRatingItem {
  id?: number;
  place: number;
  fullname: string;
  green: number;
  blue: number;
  red: number;
  style?: string;
  top: "gold" | "silver" | "bronze" | "none";
  hideButton: boolean;
  isFriend?: boolean;
}

export const RatingItem: FC<IRatingItem> = ({
  top = "none",
  hideButton = false,
  ...props
}) => {
  const [addFriend] = useAddFriendToRatingMutation();
  const [removeFriend] = useRemoveFriendFromRatingMutation();
  const [loading, setLoading] = useState(false);

  const addFriendHandler = async (id: number) => {
    setLoading(true);
    const response = await addFriend({ friend: id })
      .unwrap()
      .finally(() => setLoading(false));
  };

  const removeFriendHandler = async (id: number) => {
    setLoading(true);

    const response = await removeFriend(id)
      .unwrap()
      .finally(() => setLoading(false));
  };

  return (
    <View style={tw`flex flex-row w-full ${props?.style}`}>
      {top !== "none" ? (
        <LinearGradient
          style={tw`aspect-square w-12 rounded-xl justify-center items-center`}
          colors={grads[top]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
        >
          <Text style={tw`text-white`}>{props.place}</Text>
        </LinearGradient>
      ) : (
        <View
          style={tw`aspect-square w-12 rounded-xl justify-center items-center`}
        >
          <Text>{props.place}</Text>
        </View>
      )}

      <View style={tw`ml-4 flex-1 justify-between`}>
        <Text>{props.fullname}</Text>
        <View style={tw`flex-row`}>
          <Text style={tw`text-green-600`}>{props.green}</Text>
          <Text
            style={tw`text-blue-400 px-2 mx-2 border-l border-r border-gray-200`}
          >
            {props.blue}
          </Text>
          <Text style={tw`text-red-400`}>{props.red}</Text>
        </View>
      </View>
      {loading ? (
        <View
          style={tw`rounded-xl p-2 bg-gray-200 aspect-square items-center justify-center`}
        >
          <ActivityIndicator color="gray" size={16} />
        </View>
      ) : (
        !hideButton &&
        (!props?.isFriend ? (
          <CustomIconButton
            name={"account-plus"}
            style={`bg-[#52AEF3] aspect-square items-center justify-center`}
            color={"#fff"}
            onPress={() => addFriendHandler(props.id)}
          />
        ) : (
          <CustomIconButton
            name={"account-minus"}
            style={`bg-[#F16183] aspect-square items-center justify-center`}
            color={"#fff"}
            onPress={() => removeFriendHandler(props.id)}
          />
        ))
      )}
    </View>
  );
};

export default RatingItem;
