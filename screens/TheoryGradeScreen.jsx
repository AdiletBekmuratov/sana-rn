import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import { useGetTopicsByLessonIdQuery } from "../redux/services/authorized.service";

const TheoryGradeScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;
  const { data, error, isLoading, isError } =
    useGetTopicsByLessonIdQuery(lessonId);

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
            onPress={() =>
              navigation.navigate("TheoryQuestionsScreen", { topicId: item.id })
            }
            disabled={!item.is_active}
          >
            <Card
              style={tw`${index !== 0 && "mt-4"} ${
                !item.is_active && "opacity-50"
              }`}
            >
              <Card.Content>
                <Text style={tw`text-lg font-bold`}>{item.name}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TheoryGradeScreen;
