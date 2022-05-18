import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
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
  useLazyGetFriendsRatingQuery,
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

  const [getFriendsRating] = useLazyGetFriendsRatingQuery();

  const { data: myRating, isLoading: myRateLoading } = useGetMyRatingQuery();
  const { data: allLessons = [], isLoading: lessonsLoading } =
    useGetAllLessonsQuery();

  const [friendOnly, setFriendOnly] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lesson, setLesson] = useState("");

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getData = async (val_page) => {
    setLoading(true);
    const respData = await getGlobalRating({
      lessonId: lesson,
      page: val_page,
    }).unwrap();

    setTotalPage(respData.total_pages);
    setPage(val_page + 1);
    setDataSource([...dataSource, ...respData.data]);
    setLoading(false);
  };

  useEffect(async () => {
    if (friendOnly) {
      setLoading(true);
      const respData = await getFriendsRating().unwrap();
      setPage(1);
      setDataSource(respData);
      setLoading(false);
    } else {
      await getData(1);
    }
  }, [friendOnly]);

  useEffect(() => {
    if (lesson !== "" && lesson !== null) {
      getData(1);
    }
  }, [lesson]);

  useEffect(async () => {
    await getData(page);
  }, []);

  const renderFooter = () => {
    return (
      <>
        {totalPage >= page && !friendOnly && (
          <View style={tw`w-full justify-center items-center pt-4`}>
            <Button
              mode="outlined"
              loading={loading}
              onPress={() => getData(page)}
            >
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
      <View style={tw`flex flex-row justify-between items-center`}>
        <Checkbox.Item
          label={i18n.t("Rating.onlyFriends")}
          status={friendOnly ? "checked" : "unchecked"}
          onPress={() => setFriendOnly(!friendOnly)}
        />
        <IconButton icon="filter" style={tw`bg-white`} onPress={showDialog} />
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{i18n.t("Rating.chooseLesson")}</Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(val) => {
                setDataSource([]);
                setLesson(val);
              }}
              value={lesson}
            >
              <RadioButton.Item
                label={i18n.t("Rating.allLessons")}
                position="leading"
                value=""
              />
              <FlatList
                style={tw`h-92`}
                data={allLessons}
                renderItem={({ item }) => (
                  <RadioButton.Item
                    label={item.name}
                    position="leading"
                    value={item.id}
                  />
                )}
              />
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{i18n.t("close")}</Button>
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
                  {index + 1}
                  {")"} {item.first_name} {item.last_name}
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
              {myRating?.my_place}
              {")"} {myRating.first_name} {myRating.last_name}
            </Text>
            <Text>{myRating.mastered_quantity}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}
