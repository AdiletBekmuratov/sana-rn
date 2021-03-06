import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, IconButton, Snackbar, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import i18n from "../i18n";
import {
  useLazyGetTheoryAnswerByQuestionIdQuery,
  useLazyGetTheoryQuestionsByTopicIdQuery,
} from "../redux/services/authorized.service";

const TheoryQuestionsScreen = ({ route, navigation }) => {
  const { topicId } = route.params;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [showEye, setShowEye] = useState([]);
  const [answers, setAnwers] = useState([]);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const onDismissSnackBar = () => setVisible(false);

  const [getQuestions, { data, error, isLoading, isError }] =
    useLazyGetTheoryQuestionsByTopicIdQuery({ topicId, page });

  const [getAnswerByQId] = useLazyGetTheoryAnswerByQuestionIdQuery();

  const getData = async () => {
    setLoading(true);
    const respData = await getQuestions({ topicId, page }).unwrap();

    setTotalPage(respData.total_pages);
    setPage(page + 1);
    setDataSource([...dataSource, ...respData.data]);
    setLoading(false);
  };

  const showAnswer = async (questionId, index) => {
    try {
      const response = await getAnswerByQId(questionId).unwrap();
      console.log("RESPONSE", { response });
      const save = {
        id: questionId,
        answer: response.answer,
      };
      setAnwers([...answers, save]);
      setShowEye([...showEye, index]);
    } catch (error) {
      console.log("ERROR", { error });
      setMessage(
        error.data.message.charAt(0).toUpperCase() + error.data.message.slice(1)
      );
      setVisible(true);
    }
  };

  const hideAnswer = async (questionId, index) => {
    let newArrAnswers = answers.filter((x) => x.id !== questionId);
    let newArrShowEye = showEye.filter((x) => x !== index);
    setAnwers(newArrAnswers);
    setShowEye(newArrShowEye);
  };

  useEffect(async () => {
    await getData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const renderFooter = () => {
    return (
      <>
        {totalPage >= page && (
          <View style={tw`w-full justify-center items-center pt-4`}>
            <Button mode="outlined" loading={loading} onPress={getData}>
              {i18n.t("show_more")}
            </Button>
          </View>
        )}
      </>
    );
  };

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => item.id + index.toString()}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <View
            style={tw`flex-row justify-between items-center ${
              index !== 0 ? "mt-4" : ""
            }`}
          >
            <Card style={tw`${"w-[88%]"}`}>
              <Card.Content>
                <Text style={tw`text-lg font-semibold`}>
                  {index + 1}) {item.question}
                </Text>
                {answers.find((x) => x?.id === item.id) && (
                  <Text>
                    ??????????: {answers.find((x) => x?.id === item.id).answer}
                  </Text>
                )}
              </Card.Content>
            </Card>
            {!showEye.includes(index) ? (
              <IconButton
                onPress={() => showAnswer(item.id, index)}
                icon="eye"
                style={tw`w-12 h-12 rounded-full bg-white`}
              />
            ) : (
              <IconButton
                onPress={() => hideAnswer(item.id, index)}
                icon="eye-off"
                style={tw`w-12 h-12 rounded-full bg-white`}
              />
            )}
          </View>
        )}
      />
      <View style={tw`w-full`}>
        <Snackbar
          duration={3000}
          visible={visible}
          onDismiss={onDismissSnackBar}
        >
          {message}
        </Snackbar>
      </View>
    </View>
  );
};

export default TheoryQuestionsScreen;
