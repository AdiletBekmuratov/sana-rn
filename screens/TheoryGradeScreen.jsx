import React, { useEffect } from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import { CustomButton } from "../components/ui";
import { useGetTopicsByLessonIdQuery } from "../redux/services/authorized.service";

const TheoryGradeScreen = ({ route, navigation }) => {
  const { lessonId, title } = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

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
          <CustomButton
            onPress={() =>
              navigation.navigate("TheoryQuestionsScreen", {
                topicId: item.id,
                title: item.name,
              })
            }
            disabled={!item.is_active}
            style={`${index !== 0 ? "mt-4" : ""}`}
            textPosition="items-start"
          >
            {item.name}
          </CustomButton>
        )}
      />
    </View>
  );
};

export default TheoryGradeScreen;
