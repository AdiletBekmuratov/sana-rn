import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  RadioButton,
  Text,
} from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import i18n from "../i18n";
import {
  useGetAllLessonsQuery,
  useGetMyRatingQuery,
  useLazyGetAllRatingQuery,
} from "../redux/services/authorized.service";

export default function Rating() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const [
    getGlobalRating,
    { data: globalRating = [], isLoading, error, isError },
  ] = useLazyGetAllRatingQuery();

  const { data: myRating, isLoading: myRateLoading } = useGetMyRatingQuery();
  const { data: allLessons, isLoading: lessonsLoading } =
    useGetAllLessonsQuery();

  const [visible, setVisible] = useState(false);
  const [lesson, setLesson] = useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getData = async () => {
    setLoading(true);
    const respData = await getGlobalRating({ lessonId: lesson, page }).unwrap();

    setTotalPage(respData.total_pages);
    setPage(page + 1);
    setDataSource([...dataSource, ...respData.data]);
    setLoading(false);
  };

  useEffect(async () => {
    await getData();
  }, []);

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

  if (isLoading || myRateLoading || lessonsLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-between bg-gray-100`}>
      <View style={tw`flex items-end`}>
        <IconButton icon="filter" style={tw`bg-white`} onPress={showDialog} />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Выбрать предмет</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(newValue) => {
                setPage(1);
                setDataSource([]);
                setLesson(newValue);
                getData();
              }}
              value={lesson}
            >
              <View style={tw`flex flex-row items-center`}>
                <RadioButton value="" />
                <Text style={tw`ml-2`}>Все предметы</Text>
              </View>
              {allLessons.map((lesson) => (
                <View key={lesson.id} style={tw`flex flex-row items-center`}>
                  <RadioButton value={lesson.id} />
                  <Text style={tw`ml-2`}>{lesson.name}</Text>
                </View>
              ))}
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Закрыть</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FlatList
        style={tw`w-full`}
        data={dataSource}
        keyExtractor={(item, index) => item.id}
        ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <Card style={tw`mt-2`}>
            <Card.Content>
              <View style={tw`flex flex-row justify-between`}>
                <Text>
                  {index + 1} | {item.first_name} {item.last_name}
                </Text>
                <Text>{item.mastered_quantity}</Text>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      <Card style={tw`mt-2`}>
        <Card.Content>
          <View style={tw`flex flex-row justify-between`}>
            <Text>
              {myRating?.my_place} | {myRating.first_name} {myRating.last_name}
            </Text>
            <Text>{myRating.mastered_quantity}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
