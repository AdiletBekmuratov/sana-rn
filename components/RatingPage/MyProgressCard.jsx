import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import tw from "twrnc";
import { ButtonGroup } from "../ui";
import { useGetMyRatingQuery } from "@/redux/services/authorized.service";

export const MyProgressCard = ({ style = "" }) => {
  const { data, isLoading } = useGetMyRatingQuery();

  return (
    <View style={tw`${style}`}>
      <Text style={tw`text-gray-400`}>Жеке прогресс</Text>
      <ButtonGroup
        containerStyle="mt-2"
        buttons={[
          {
            children: (
              <View style={tw`flex flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <View
                    style={tw`rounded-full w-4 aspect-square bg-green-600`}
                  />
                  <Text style={tw`ml-2`}>Меңгердім</Text>
                </View>
                <Text>{isLoading ? '...' : data?.mastered_quantity}</Text>
              </View>
            ),
          },
          {
            children: (
              <View style={tw`flex flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <View
                    style={tw`rounded-full w-4 aspect-square bg-blue-400`}
                  />
                  <Text style={tw`ml-2`}>Қайталау</Text>
                </View>
                <Text>{isLoading ? '...' : data?.repeat_quantity}</Text>
              </View>
            ),
          },
          {
            children: (
              <View style={tw`flex flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`rounded-full w-4 aspect-square bg-red-400`} />
                  <Text style={tw`ml-2`}>Қателескен</Text>
                </View>
                <Text>{isLoading ? '...' : data?.wrong_quantity}</Text>
              </View>
            ),
          },
        ]}
      />
    </View>
  );
};
