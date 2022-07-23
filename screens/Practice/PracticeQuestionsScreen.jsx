import {
	ActionButtons,
	OptionButton,
	QuestionCard
} from "@/components/Questions";
import Spinner from "@/components/Spinner";
import {
	useLazyGetPracticeQuestionsByTopicIdQuery,
	useSendAnswerMutation
} from "@/redux/services/authorized.service";
import React, { useEffect, useState } from "react";
import { FlatList, Vibration, View } from "react-native";
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
    <View style={tw`flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <QuestionCard
        questionText={questions[currentQ]?.question}
        questionNumber={currentQ + 1}
      />
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
      <ActionButtons
        currentQ={currentQ}
        disabled={disabled}
        handleFinish={() => handleFinish()}
        handleNext={() => handleNext()}
        handleSubmit={() => handleSubmit()}
        pressedBtns={pressedBtns}
        questions={questions}
      />
    </View>
  );
};
