import { useGetEntryDaysQuery } from "@/redux/services/authorized.service";
import { getCurrentWeek, setEntered } from "@/utils/date";
import grads from "@/utils/grads";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";

export const EntryDays = ({ style = "" }) => {
  const { data: entryDays = {} } = useGetEntryDaysQuery();
  const [date, setDate] = useState({});

  useEffect(() => {
    const getInitialData = async () => {
      await setEntered();
      const weekData = await getCurrentWeek();
      // console.log(weekData);
      setDate(weekData);
    };

    getInitialData();
  }, []);

  return (
    <View style={tw`${style}`}>
      <Text style={tw`text-gray-400`}>Күнделік</Text>

      <View style={tw`p-4 rounded-xl shadow-md bg-white mt-2`}>
        <View style={tw`flex flex-row justify-center items-center relative`}>
          <View style={tw`flex-1 items-center justify-center`}>
            <LinearGradient
              style={tw`justify-center items-center p-4 w-24 aspect-square rounded-full`}
              colors={grads["green"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
            >
              <Text style={tw`text-4xl text-white`}>{entryDays?.all_day}</Text>
            </LinearGradient>
            <Text style={tw`text-xl text-center mt-2`}>
              Барлық {"\n"} кірген күн
            </Text>
          </View>
          <View style={tw`w-px bg-gray-300 h-4/5 absolute`} />
          <View style={tw`flex-1 items-center justify-center`}>
            <LinearGradient
              style={tw`justify-center items-center p-4 w-24 aspect-square rounded-2xl`}
              colors={grads["red_orange"]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 1.0, y: 1.0 }}
            >
              <Text style={tw`text-4xl text-white`}>
                {entryDays?.consecutive_days}
              </Text>
            </LinearGradient>
            <Text style={tw`text-xl text-center mt-2`}>
              Қатарынан {"\n"} кірген күн
            </Text>
          </View>
        </View>
        <View style={tw`flex-row justify-between items-center mt-4`}>
          {date?.currentWeekDays?.map((item, index) => (
            <Text key={index} style={tw`text-gray-400 capitalize text-sm px-2`}>
              {item.minWeekName}
            </Text>
          ))}
        </View>
        <View style={tw`flex-row justify-center items-center mt-2 relative`}>
          <View style={tw`h-px bg-gray-300 w-full absolute`} />
          <Text style={tw`text-gray-400 capitalize text-sm bg-white px-4`}>
            {date?.currentMonth}
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center mt-2`}>
          {date?.currentWeekDays?.map((item, index) => (
            <View
              key={item.dayNum + "-day-num"}
              style={tw`justify-center items-center relative p-2 rounded-full overflow-hidden ${
                item.entered ? "bg-green-500" : "bg-gray-100"
              } ${item.isToday ? "border-2 border-green-500 bg-gray-100" : ""}`}
            >
              {item.isToday && (
                <AntDesign
                  name="caretdown"
                  size={16}
                  color="orange"
                  style={tw`absolute -top-2`}
                />
              )}
              <Text style={tw`${item.entered ? "text-white" : "text-gray-300"} ${item.isToday ? "text-gray-300" : ""} text-center`}>{item.dayNum}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
