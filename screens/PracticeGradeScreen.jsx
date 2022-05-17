import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import { useGetPracticeTopicsByLessonIdQuery } from "../redux/services/authorized.service";

const PracticeGradeScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const { data, error, isLoading, isError } =
    useGetPracticeTopicsByLessonIdQuery(lessonId);

  console.log("Practice Topics", data);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={tw`${index !== 0 ? "mt-4" : ""}`}
            onPress={() =>
              navigation.navigate("PracticeQuestionsScreen", {
                topicId: item.id,
              })
            }
            disabled={!item.is_active}
          >
            <Card style={tw`${!item.is_active ? "opacity-50" : ""}`}>
              <Card.Content
                style={tw`flex flex-row justify-between items-center`}
              >
                <Text style={tw`text-lg font-bold`}>{item.name}</Text>
                <Text style={tw`text-lg font-bold ml-2`}>
                  {item.my_answer_question}/{item.sum_of_question}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default PracticeGradeScreen;
