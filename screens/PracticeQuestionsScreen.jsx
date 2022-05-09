import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Card, Headline, Subheading, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import { useLazyGetPracticeQuestionsByTopicIdQuery } from "../redux/services/authorized.service";

const PracticeQuestionsScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [testId, setTestId] = useState();
  const [currentQ, setCurrentQ] = useState(0);
  const [pressedBtns, setPressedBtns] = useState([]);
  const [getQuestions, { data, error, isLoading, isError }] =
    useLazyGetPracticeQuestionsByTopicIdQuery(topicId);

  useEffect(async () => {
    try {
      const response = await getQuestions(topicId).unwrap();
      setTestId(response.test);
      setQuestions(response.questions);
    } catch (error) {
      console.log("ERR PRAC QUESTIONS", error);
    }
  }, [topicId]);

  const optionClick = (optionId) => {};

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <Headline style={tw`font-bold`}>Вопрос №{currentQ + 1}</Headline>
      <Subheading>{questions[currentQ]?.question}</Subheading>
      <FlatList
        data={questions[currentQ]?.answers_list}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 0.5,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate(item.screen)}
              style={tw.style(
                "p-4",
                "bg-[#002C67]",
                "rounded",
                "justify-center",
                "items-center",
                "m-2",
                {
                  minHeight: 150,
                  flex: 1,
                }
              )}
            >
              <View>
                <Text style={tw`text-lg font-bold text-white`}>
                  {item.answer}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button style={tw`mt-4`} mode="contained" color="#002C67">
        Отправить
      </Button>
    </View>
  );
};

export default PracticeQuestionsScreen;
