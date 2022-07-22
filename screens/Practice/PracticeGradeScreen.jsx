import React, { useEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import i18n from "@/utils/i18n";
import {
  useGetPracticeTopicsByLessonIdQuery,
  useGetQuantityMasteredQuery,
} from "@/redux/services/authorized.service";
import { CustomGradientButton } from "@/components/ui";

export const PracticeGradeScreen = ({ route, navigation }) => {
  const { lessonId, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

  const { data, error, isLoading, isError } =
    useGetPracticeTopicsByLessonIdQuery(lessonId);

  const {
    data: masteredWrongQ,
    isLoading: isLoadingMasteredWrongQ,
    error: errorMasteredWrongQ,
  } = useGetQuantityMasteredQuery(lessonId);

  if (isLoading || isLoadingMasteredWrongQ) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex flex-1 px-5 pb-5 justify-start bg-gray-100`}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        renderItem={({ item, index }) => (
          <CustomGradientButton
            onPress={() =>
              navigation.navigate("PracticeQuestionsScreen", {
                topicId: item.id,
                title: item.name,
              })
            }
            disabled={!item.is_active}
            style={`${index !== 0 ? "mt-4" : ""}`}
            textPosition="items-start"
            variant="orange"
          >
            {item.name}
          </CustomGradientButton>
        )}
      />
      <TouchableOpacity
        style={tw`mt-4`}
        disabled={masteredWrongQ?.mastered_quantity <= 0}
        onPress={() => {
          navigation.navigate("MasteredWrongQuestionsScreen", {
            lessonId: lessonId,
            mastered: true,
          });
        }}
      >
        <Card
          style={tw`${
            masteredWrongQ?.mastered_quantity <= 0 ? "opacity-50" : ""
          }`}
        >
          <Card.Content style={tw`flex flex-row justify-between items-center`}>
            <Text style={tw`text-lg font-bold`}>
              {i18n.t("MainStack.redoMastered")}
            </Text>
            <Text style={tw`text-lg font-bold ml-2`}>
              {masteredWrongQ?.mastered_quantity}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        style={tw`mt-4`}
        disabled={masteredWrongQ?.wrong_quantity <= 0}
        onPress={() => {
          navigation.navigate("MasteredWrongQuestionsScreen", {
            lessonId: lessonId,
            mastered: false,
          });
        }}
      >
        <Card
          style={tw`${masteredWrongQ?.wrong_quantity <= 0 ? "opacity-50" : ""}`}
        >
          <Card.Content style={tw`flex flex-row justify-between items-center`}>
            <Text style={tw`text-lg font-bold`}>
              {i18n.t("MainStack.redoWrong")}
            </Text>
            <Text style={tw`text-lg font-bold ml-2`}>
              {masteredWrongQ?.wrong_quantity}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
};
