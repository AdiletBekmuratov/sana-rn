import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../components/Header";
import ChangeProfile from "../screens/ChangeProfile";
import Home from "../screens/Home";
import { getHeaderTitle } from "@react-navigation/elements";
import TheoryScreen from "../screens/TheoryScreen";
import GradeScreen from "../screens/GradeScreen";
import TheoryQuestionsScreen from "../screens/TheoryQuestionsScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);

          return (
            <Header
              title={title}
              rightButton={back}
              routeName={route.name}
              navigation={navigation}
            />
          );
        },
      }}
    >
      <Stack.Screen
        options={{
          title: "Басты бет",
        }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={{
          title: "Теория",
        }}
        name="TheoryScreen"
        component={TheoryScreen}
      />
      <Stack.Screen
        options={{
          title: "Класс",
        }}
        name="GradeScreen"
        component={GradeScreen}
      />
      <Stack.Screen
        options={{
          title: "Вопросы",
        }}
        name="TheoryQuestionsScreen"
        component={TheoryQuestionsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
