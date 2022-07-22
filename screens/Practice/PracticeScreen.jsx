import Spinner from "@/components/Spinner";
import { CustomGradientButton } from "@/components/ui";
import { useGetPracticeLessonsQuery } from "@/redux/services/authorized.service";
import React from "react";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";

export const PracticeScreen = ({ navigation }) => {
  const { data, error, isLoading, isError } = useGetPracticeLessonsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CustomGradientButton
            onPress={() =>
              navigation.navigate("PracticeGradeScreen", {
                lessonId: item.id,
                title: item.name,
              })
            }
            style={`${index !== 0 ? "mt-4" : ""}`}
            textPosition="items-start"
            customChildren={true}
            variant="orange"
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
    </View>
  );
};