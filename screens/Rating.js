import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import tw from "twrnc";
import Spinner from "../components/Spinner";

export default function Rating() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topUsers, setTopUsers] = useState([]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={tw`h-full flex-1 p-5 justify-start bg-gray-100`}>
      {!loading && (
        <FlatList
          style={tw`w-full`}
          data={topUsers}
          keyExtractor={(item, index) => item.id + index}
          renderItem={({ item, index }) => (
            <Card style={tw`my-2`}>
              <Card.Content>
                <View style={tw`flex flex-row justify-between`}>
                  <Text>
                    {index + 1} | {item.firstName} {item.lastName}
                  </Text>
                  <Text>
                    {item.points.taught} | {item.points.mistake} |{" "}
                    {item.points.challenge}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
}
