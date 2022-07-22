import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Button,
  Card,
  Dialog,
  IconButton,
  Portal,
  RadioButton,
  Text,
} from "react-native-paper";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import i18n from "@/utils/i18n";
import {
  useAddFriendToRatingMutation,
  useGetAllLessonsQuery,
  useGetMyRatingQuery,
  useLazyGetAllRatingQuery,
  useRemoveFriendFromRatingMutation,
} from "@/redux/services/authorized.service";

export const RatingScreen = () => {
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [dataSource, setDataSource] = useState([]);

  const [getGlobalRating, { data: globalRating, isLoading, error, isError }] =
    useLazyGetAllRatingQuery();

  const { data: myRating, isLoading: myRateLoading } = useGetMyRatingQuery();
  const { data: allLessons = [], isLoading: lessonsLoading } =
    useGetAllLessonsQuery();

  const [addFriend] = useAddFriendToRatingMutation();

  const [visible, setVisible] = useState(false);
  const [lesson, setLesson] = useState("");
  const [removeFriend] = useRemoveFriendFromRatingMutation();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const getData = async (val_page) => {
    setLoading(true);
    await getGlobalRating({
      lessonId: lesson,
      page: val_page,
    }).unwrap();

    setLoading(false);
  };

  useEffect(() => {
    if (globalRating) {
      console.log("rerender");
      setTotalPage(globalRating?.total_pages);
      setDataSource(globalRating?.data);
      // if (globalRating?.current_page == 1) {
      //   setDataSource(globalRating?.data);
      // } else if (globalRating?.current_page == page) {
      //   const newData = dataSource.slice(0, (page - 1) * 2);
      //   setDataSource([...newData, ...globalRating?.data]);
      // } else {
      //   setDataSource([...dataSource, ...globalRating?.data]);
      // }

      // setNextPage(globalRating?.current_page + 1);
      // setPage(globalRating?.current_page);
    }
  }, [globalRating]);

  useEffect(() => {
    getData(1);
  }, [lesson]);

  useEffect(() => {
    const getInitialData = async () => {
      await getData(1);
    };
    getInitialData();
  }, []);

  const addFriendHandler = async (id) => {
    const response = await addFriend({ friend: id }).unwrap();
  };

  const removeFriendHandler = async (id) => {
    console.log(id);
    const response = await removeFriend(id);
    console.log({ response });
  };

  const renderFooter = () => {
    return (
      <>
        {totalPage >= nextPage && (
          <View style={tw`w-full justify-center items-center pt-4`}>
            <Button
              mode="outlined"
              loading={loading}
              onPress={() => getData(nextPage)}
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
    <View style={tw`h-full flex-1 px-5 pb-5 pt-2 justify-between bg-gray-100`}>
      <View style={tw`flex flex-row justify-end items-center`}>
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
        // ListFooterComponent={renderFooter}
        renderItem={({ item, index }) => (
          <Card style={tw`mt-2`}>
            <Card.Content>
              <View style={tw`flex flex-row justify-between items-center`}>
                <Text style={tw`w-1/2`}>
                  {index + 1}
                  {")"} {item.first_name} {item.last_name}
                </Text>
                <View style={tw`flex flex-row justify-end items-center w-1/2`}>
                  <Text>
                    {i18n.t("Rating.mastered")}: {item.mastered_quantity}
                  </Text>
                  <View>
                    {item.id !== myRating.id ? (
                      !item.is_friend ? (
                        <IconButton
                          icon="account-plus"
                          style={tw`ml-2 bg-gray-200`}
                          onPress={() => addFriendHandler(item.id)}
                        />
                      ) : (
                        <IconButton
                          icon="account-minus"
                          style={tw`ml-2 bg-gray-200`}
                          onPress={() => removeFriendHandler(item.id)}
                        />
                      )
                    ) : (
                      <IconButton
                        icon="emoticon"
                        style={tw`ml-2 bg-gray-200`}
                      />
                    )}
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      <Card style={tw`mt-2`}>
        <Card.Content>
          <View style={tw`flex flex-row justify-between items-center`}>
            <Text style={tw`w-1/2`}>
              {myRating?.my_place}
              {")"} {myRating.first_name} {myRating.last_name}
            </Text>
            <Text>
              {i18n.t("Rating.mastered")}: {myRating.mastered_quantity}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};
