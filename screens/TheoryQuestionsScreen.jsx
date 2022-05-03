import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Card, IconButton, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
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
      console.log({ response });
      const save = {
        id: questionId,
        answer: response.answer,
      };
      setAnwers([...answers, save]);
      setShowEye([...showEye, index]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    await getData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <>
        {totalPage >= page && (
          <View style={tw`w-full justify-center items-center pt-4`}>
            <Button
              mode="outlined"
              loading={loading}
              color="#002C67"
              onPress={getData}
            >
              Тағы көрсету
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
              index !== 0 && "mt-4"
            }`}
          >
            <Card style={tw`${showEye.includes(index) ? "w-full" : "w-[90%]"}`}>
              <Card.Content>
                <Text style={tw`text-lg font-semibold`}>
                  {index + 1}) {item.question}
                </Text>
                {answers.find((x) => x?.id === item.id) && (
                  <Text>{answers.find((x) => x?.id === item.id).answer}</Text>
                )}
              </Card.Content>
            </Card>
            {!showEye.includes(index) && (
              <IconButton
                onPress={() => showAnswer(item.id, index)}
                disabled={showEye.includes(index)}
                icon="eye"
                style={tw`${
                  showEye.includes(index) ? "hidden" : "w-[10%]"
                } bg-white `}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TheoryQuestionsScreen;
