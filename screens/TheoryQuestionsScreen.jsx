import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import { CustomIconButton } from "@/components/ui";
import i18n from "@/utils/i18n";
import {
  useLazyGetTheoryAnswerByQuestionIdQuery,
  useLazyGetTheoryQuestionsByTopicIdQuery,
} from "@/redux/services/authorized.service";
import { addMessage } from "@/redux/slices/auth";

const TheoryQuestionsScreen = ({ route, navigation }) => {
  const { topicId, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [title, navigation]);

  const dispatch = useDispatch();

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
      console.log("RESPONSE", { response });
      const save = {
        id: questionId,
        answer: response.answer,
      };
      setAnwers([...answers, save]);
      setShowEye([...showEye, index]);
    } catch (error) {
      console.log("ERROR", { error });
      dispatch(
        addMessage(
          error.data.message.charAt(0).toUpperCase() +
            error.data.message.slice(1)
        )
      );
    }
  };

  const hideAnswer = async (questionId, index) => {
    let newArrAnswers = answers.filter((x) => x.id !== questionId);
    let newArrShowEye = showEye.filter((x) => x !== index);
    setAnwers(newArrAnswers);
    setShowEye(newArrShowEye);
  };

  useEffect(() => {
    const getInitialData = async () => {
      await getData();
    };
    getInitialData();
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
    <View style={tw`flex-1 justify-start bg-gray-100`}>
      <FlatList
        contentContainerStyle={tw`px-5 pb-5`}
        data={dataSource}
        keyExtractor={(item, index) => item.id + index.toString()}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <View
            style={tw`justify-start bg-white p-4 rounded-xl ${
              index !== 0 ? "mt-4" : ""
            }`}
          >
            <Text style={tw`text-left w-full font-bold`}>№ {index + 1}</Text>
            <Text style={tw`text-lg font-semibold mt-2`}>{item.question}</Text>
            {answers.find((x) => x?.id === item.id) && (
              <Text style={tw`mt-2`}>
                Жауабы:{" "}
                <Text style={tw`text-[#52AEF3]`}>
                  {answers.find((x) => x?.id === item.id).answer}
                </Text>
              </Text>
            )}
            <View style={tw`flex flex-row justify-end w-full`}>
              <CustomIconButton
                style="bg-[#52AEF3] mt-6"
                color={"white"}
                name={!showEye.includes(index) ? "eye" : "eye-off"}
                onPress={
                  !showEye.includes(index)
                    ? () => showAnswer(item.id, index)
                    : () => hideAnswer(item.id, index)
                }
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TheoryQuestionsScreen;
