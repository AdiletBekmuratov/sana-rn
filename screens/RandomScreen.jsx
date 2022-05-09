import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";
import { useGetRandomLessonsQuery } from "../redux/services/authorized.service";

const RandomScreen = ({ navigation }) => {
  const { data, error, isLoading, isError } = useGetRandomLessonsQuery();

  console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 px-5 pb-5 justify-center bg-gray-100`}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("", { lessonId: item.id })
            }
          >
            <Card style={tw`${index !== 0 ? "mt-4" : ""}`}>
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

export default RandomScreen;
