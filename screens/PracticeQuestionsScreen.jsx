import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Headline, Subheading, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import i18n from "../i18n";
import {
	useLazyGetPracticeQuestionsByTopicIdQuery,
	useSendAnswerMutation
} from "../redux/services/authorized.service";

const PracticeQuestionsScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const [questions, setQuestions] = useState([]);
  const [testId, setTestId] = useState();
  const [currentQ, setCurrentQ] = useState(0);
  const [pressedBtns, setPressedBtns] = useState([]);
  const [getQuestions, { data, error, isLoading, isError }] =
    useLazyGetPracticeQuestionsByTopicIdQuery(topicId);
  const [sendAnswer] = useSendAnswerMutation();

  useEffect(async () => {
    if (topicId) {
      try {
        const response = await getQuestions(topicId).unwrap();
        setTestId(response.test);
        setQuestions(response.questions);
      } catch (error) {
        console.log("ERR PRAC QUESTIONS", error);
      }
    }
  }, [topicId]);

  const handleSubmit = async () => {
    try {
      const body = {
        answers: pressedBtns,
        question: questions[currentQ].id,
        test: testId,
      };
      const res = await sendAnswer(body).unwrap();

      if (questions.length - 1 === currentQ) {
        navigation.replace("EndScreen", { testId, size: questions.length });
      } else {
        setCurrentQ((prev) => prev + 1);
        setPressedBtns([]);
      }
    } catch (error) {
      console.log("PASS_ANSWER error", error);
    }
  };

  const handleOptionClick = (id) => {
    if (pressedBtns.includes(id)) {
      setPressedBtns(pressedBtns.filter((x) => x !== id));
    } else {
      setPressedBtns([...pressedBtns, id]);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <Headline style={tw`font-bold`}>
        {i18n.t("QuestionsScreen.title")}
        {currentQ + 1}
      </Headline>
      <Subheading>{questions[currentQ]?.question}</Subheading>
      <FlatList
        style={tw`mt-2`}
        data={questions[currentQ]?.answers_list}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 0.5,
            }}
          >
            <TouchableOpacity
              onPress={() => handleOptionClick(item.id)}
              style={tw.style(
                "p-4",
                "rounded",
                "justify-center",
                "items-center",
                "m-2",
                pressedBtns.includes(item.id) ? "bg-[#002C67]" : "bg-[#9ab4d4]",
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
      <Button
        style={tw`mt-4`}
        mode="contained"
        color="#002C67"
        onPress={() => handleSubmit()}
        disabled={pressedBtns.length <= 0}
      >
        {questions.length - 1 > currentQ
          ? i18n.t("QuestionsScreen.submit")
          : i18n.t("QuestionsScreen.finish")}
      </Button>
    </View>
  );
};

export default PracticeQuestionsScreen;
