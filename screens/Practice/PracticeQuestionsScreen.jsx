import { OptionButton } from "@/components/Questions/OptionButton";
import Spinner from "@/components/Spinner";
import {
  useLazyGetPracticeQuestionsByTopicIdQuery,
  useSendAnswerMutation,
} from "@/redux/services/authorized.service";
import i18n from "@/utils/i18n";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Vibration, View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";

export const PracticeQuestionsScreen = ({ route, navigation }) => {
  const { topicId, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

  const [isLatex, setIsLatex] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [testId, setTestId] = useState();
  const [currentQ, setCurrentQ] = useState(0);
  const [pressedBtns, setPressedBtns] = useState([]);
  const [getQuestions, { data, error, isLoading, isError }] =
    useLazyGetPracticeQuestionsByTopicIdQuery(topicId);
  const [sendAnswer] = useSendAnswerMutation();

  const [correct, setCorrect] = useState();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const getAllQuestions = async () => {
      if (topicId) {
        try {
          const response = await getQuestions(topicId).unwrap();
          setIsLatex(response?.math);
          setTestId(response.test);
          setQuestions(response.questions);
        } catch (error) {
          console.log("ERR PRAC QUESTIONS", error);
        }
      }
    };
    getAllQuestions();
  }, [topicId]);

  const handleSubmit = async (pressedSingle) => {
    try {
      const body = {
        answers: pressedSingle ?? pressedBtns,
        question: questions[currentQ].id,
        test: testId,
        question_type: "practice",
      };

      const res = await sendAnswer(body);

      setDisabled(true);
      setCorrect(res?.data?.correct);
      if (!res?.data?.correct) {
        Vibration.vibrate();
      }
    } catch (error) {
      console.log("PASS_ANSWER error", error);
    }
  };

  const handleFinish = () => {
    navigation.replace("EndScreen", { testId, size: currentQ + 1 });
  };

  const handleNext = () => {
    setDisabled(false);

    if (questions.length - 1 === currentQ) {
      navigation.replace("EndScreen", { testId, size: questions.length });
    } else {
      setCurrentQ((prev) => prev + 1);
      setPressedBtns([]);
    }
  };

  const handleOptionClick = (id) => {
    if (pressedBtns.includes(id)) {
      setPressedBtns(pressedBtns.filter((x) => x !== id));
    } else {
      if (questions[currentQ].multichoice) {
        setPressedBtns([...pressedBtns, id]);
      } else {
        setPressedBtns([id]);
        handleSubmit([id]);
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <View style={tw`rounded-xl bg-white p-4 items-center`}>
        <Text style={tw`font-bold text-lg mb-2`}>
          {i18n.t("QuestionsScreen.title")}
          {currentQ + 1}
        </Text>
        <Text style={tw`text-center`}>{questions[currentQ]?.question}</Text>
      </View>
      <FlatList
        style={tw`mt-2`}
        data={questions[currentQ]?.answers_list}
        numColumns={2}
        renderItem={({ item, index }) => (
          <OptionButton
            disabled={disabled}
            onPress={() => handleOptionClick(item.id)}
            index={index}
            isLatex={isLatex}
            item={item}
          />
        )}
      />
      {!disabled ? (
        questions[currentQ]?.multichoice && (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleSubmit()}
            disabled={pressedBtns.length <= 0 || disabled}
            style={tw`bg-blue-300 rounded-xl p-4 items-center`}
          >
            <Text style={tw`text-white font-bold`}>
              {i18n.t("QuestionsScreen.submit")}
            </Text>
          </TouchableOpacity>
        )
      ) : (
        <View style={tw`flex flex-row justify-between items-center w-full`}>
          {questions.length - 1 > currentQ && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => handleFinish()}
              disabled={pressedBtns.length <= 0}
              style={tw`bg-white rounded-xl p-4 items-center flex-1 border-2 border-blue-300 mr-2`}
            >
              <Text style={tw`text-blue-300 font-bold`}>
                {i18n.t("QuestionsScreen.finish")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleNext()}
            disabled={pressedBtns.length <= 0}
            style={tw`bg-blue-300 rounded-xl p-4 items-center flex-1 ml-2`}
          >
            <Text style={tw`text-white font-bold`}>
              {questions.length - 1 > currentQ
                ? i18n.t("QuestionsScreen.next")
                : i18n.t("QuestionsScreen.finish")}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
