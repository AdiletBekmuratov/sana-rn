import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View, Vibration } from "react-native";
import { Button, Headline, Subheading, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import i18n from "../i18n";
import {
  useLazyGetMasteredOrWrongQuestionsQuery,
  useSendAnswerMutation,
} from "../redux/services/authorized.service";

const MasteredWrongQuestionsScreen = ({ route, navigation }) => {
  const { lessonId, mastered } = route.params;
  const [questions, setQuestions] = useState([]);
  const [testId, setTestId] = useState();
  const [currentQ, setCurrentQ] = useState(0);
  const [pressedBtns, setPressedBtns] = useState([]);
  const [getQuestions, { data, error, isLoading, isError }] =
    useLazyGetMasteredOrWrongQuestionsQuery({
      lesson: lessonId,
      url: mastered ? "mastered" : "wrong",
    });
  const [sendAnswer] = useSendAnswerMutation();

  const [correct, setCorrect] = useState();
  const [disabled, setDisabled] = useState(false);

  useEffect(async () => {
    if (lessonId) {
      try {
        const response = await getQuestions({
          lesson: lessonId,
          url: mastered ? "mastered" : "wrong",
        }).unwrap();
        setTestId(response.test);
        setQuestions(response.questions);
      } catch (error) {
        console.log("ERR PRAC QUESTIONS", error);
      }
    }
  }, [lessonId]);

  const handleSubmit = async (pressedSingle) => {
    try {
      const body = {
        answers: pressedSingle ?? pressedBtns,
        question: questions[currentQ].id,
        test: testId,
        question_type: mastered ? "mastered" : "wrong",
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
              disabled={disabled}
              onPress={() => handleOptionClick(item.id)}
              style={tw.style(
                "p-4",
                "rounded",
                "justify-center",
                "items-center",
                "m-2",
                disabled
                  ? item.correct
                    ? "bg-green-400"
                    : "bg-red-400"
                  : pressedBtns.includes(item.id)
                  ? "bg-[#002C67]"
                  : "bg-[#9ab4d4]",
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
      {!disabled ? (
        questions[currentQ]?.multichoice && (
          <Button
            style={tw`mt-4`}
            mode="contained"
            onPress={() => handleSubmit()}
            disabled={pressedBtns.length <= 0 || disabled}
          >
            {i18n.t("QuestionsScreen.submit")}
          </Button>
        )
      ) : (
        <>
          {questions.length - 1 > currentQ && (
            <Button
              style={tw`mt-4`}
              mode="contained"
              onPress={() => handleFinish()}
              disabled={pressedBtns.length <= 0}
            >
              {i18n.t("QuestionsScreen.finish")}
            </Button>
          )}
          <Button
            style={tw`mt-4`}
            mode="contained"
            onPress={() => handleNext()}
            disabled={pressedBtns.length <= 0}
          >
            {questions.length - 1 > currentQ
              ? i18n.t("QuestionsScreen.next")
              : i18n.t("QuestionsScreen.finish")}
          </Button>
        </>
      )}
    </View>
  );
};

export default MasteredWrongQuestionsScreen;
