import { ChangeQuestionsNumber } from "@/components/Questions/ChangeQuestionsNumber";
import Spinner from "@/components/Spinner";
import { CustomGradientButton } from "@/components/ui";
import { useGetRandomLessonsQuery } from "@/redux/services/authorized.service";
import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";

export const RandomScreen = ({ navigation }) => {
  const { data, error, isLoading, isError } = useGetRandomLessonsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 pb-5 justify-between bg-gray-100`}>
      <FlatList
        data={data}
        contentContainerStyle={tw`px-5 pb-5`}
        renderItem={({ item, index }) => (
          <CustomGradientButton
            onPress={() =>
              navigation.navigate("RandomQuestionsScreen", {
                lessonId: item.id,
                title: item.name,
              })
            }
            style={`${index !== 0 ? "mt-4" : ""}`}
            textPosition="items-start"
            customChildren={true}
            variant="green"
          >
            <View style={tw`flex flex-row justify-between items-center w-full`}>
              <Text style={tw`text-white`}>{item.name}</Text>
              <Text style={tw`text-white`}>
                {item.my_answer_question} / {item.sum_of_question}
              </Text>
            </View>
          </CustomGradientButton>
        )}
      />
      <View style={tw`px-5 mt-4`}>
        <ChangeQuestionsNumber />
      </View>
    </View>
  );
};
