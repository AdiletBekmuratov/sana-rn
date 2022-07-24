import { FilterModal, RatingItem } from "@/components/RatingPage";
import Spinner from "@/components/Spinner";
import { FooterButton } from "@/components/ui";
import {
  useGetAllLessonsQuery,
  useGetMyRatingQuery,
  useLazyGetAllRatingQuery,
} from "@/redux/services/authorized.service";
import i18n from "@/utils/i18n";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import tw from "twrnc";

export const GlobalRatingScreen = () => {
  const sheetRef = useRef(null);

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

  const [lesson, setLesson] = useState("");

  const getData = async (val_page) => {
    setLoading(true);
    await getGlobalRating({
      lessonId: lesson,
      page: val_page,
      size: 100,
    }).unwrap();

    setLoading(false);
  };

  useEffect(() => {
    if (globalRating) {
      console.log("rerender");
      setTotalPage(globalRating?.total_pages);
      setDataSource(globalRating?.data);
      if (globalRating?.current_page == 1) {
        setDataSource(globalRating?.data);
      } else if (globalRating?.current_page == page) {
        // const newData = dataSource.slice(0, (page - 1) * 2);
        // setDataSource([...newData, ...globalRating?.data]);
        getData(1);
      } else {
        setDataSource([...dataSource, ...globalRating?.data]);
      }

      setNextPage(globalRating?.current_page + 1);
      setPage(globalRating?.current_page);
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

  const renderFooter = () => {
    return (
      <>
        {totalPage >= nextPage && (
          <FooterButton
            disabled={loading}
            loading={loading}
            onPress={() => getData(nextPage)}
          >
            {i18n.t("show_more")}
          </FooterButton>
        )}
      </>
    );
  };

  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  if (isLoading || myRateLoading || lessonsLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`flex-1 pt-2 justify-between bg-gray-100 pb-5`}>
      <View style={tw`flex flex-row justify-end items-center px-5`}>
        <IconButton
          icon="filter"
          style={tw`bg-white`}
          onPress={() => handlePresentModalPress()}
        />
      </View>

      <FlatList
        data={dataSource}
        // ListFooterComponent={renderFooter}
        contentContainerStyle={tw`px-5 pb-5 mt-4`}
        renderItem={({ item, index }) => (
          <RatingItem
            id={item.id}
            isFriend={item.is_friend}
            fullname={`${item.first_name} ${item.last_name}`}
            place={index + 1}
            top={
              index === 0
                ? "gold"
                : index === 1
                ? "silver"
                : index === 2
                ? "bronze"
                : "none"
            }
            green={item.mastered_quantity}
            blue={item.repeat_quantity}
            red={item.wrong_quantity}
            style={index !== 0 ? "mt-4" : ""}
          />
        )}
      />
      <View style={tw`px-5`}>
        <View style={tw`mt-4 py-2 bg-[#DFF1FE] rounded-xl`}>
          <RatingItem
            fullname={`${myRating.first_name} ${myRating.last_name}`}
            place={myRating.my_place}
            top={"none"}
            green={myRating.mastered_quantity}
            blue={myRating.repeat_quantity}
            red={myRating.wrong_quantity}
            hideButton
          />
        </View>
      </View>

      <FilterModal
        sheetRef={sheetRef}
        allLessons={allLessons}
        lesson={lesson}
        onValueChange={(val) => {
          setDataSource([]);
          setLesson(val);
        }}
      />
    </View>
  );
};
