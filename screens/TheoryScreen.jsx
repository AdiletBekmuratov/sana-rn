import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import { useGetTheoryLessonsQuery } from "../redux/services/authorized.service";

const TheoryScreen = ({ navigation }) => {
  const { data, error, isLoading, isError } = useGetTheoryLessonsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  console.log(data);

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("GradeScreen", { lessonId: item.id })
            }
            disabled={!item.available}
          >
            <Card
              style={tw`${index !== 0 && "mt-4"} ${
                !item.available && "opacity-50"
              }`}
            >
              <Card.Content>
                <Text style={tw`text-lg font-bold`}>{item.name}</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TheoryScreen;
