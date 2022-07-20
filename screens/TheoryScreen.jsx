import React from "react";
import { FlatList, View } from "react-native";
import tw from "twrnc";
import Spinner from "@/components/Spinner";
import { CustomButton } from "@/components/ui";
import { useGetTheoryLessonsQuery } from "@/redux/services/authorized.service";

const TheoryScreen = ({ route, navigation }) => {
  const { data, error, isLoading, isError } = useGetTheoryLessonsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <CustomButton
            onPress={() =>
              navigation.navigate("TheoryGradeScreen", {
                lessonId: item.id,
								title: item.name
              })
            }
            disabled={!item.available}
            style={`${index !== 0 ? "mt-4" : ""}`}
            textPosition="items-start"
          >
            {item.name}
          </CustomButton>
        )}
      />
    </View>
  );
};

export default TheoryScreen;
