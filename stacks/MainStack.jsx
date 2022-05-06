import { getHeaderTitle } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../components/Header";
import i18n from "../i18n";
import Home from "../screens/Home";
import PracticeGradeScreen from "../screens/PracticeGradeScreen";
import PracticeScreen from "../screens/PracticeScreen";
import TheoryGradeScreen from "../screens/TheoryGradeScreen";
import TheoryQuestionsScreen from "../screens/TheoryQuestionsScreen";
import TheoryScreen from "../screens/TheoryScreen";

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
          title: i18n.t("MainStack.main_page"),
        }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.theory"),
        }}
        name="TheoryScreen"
        component={TheoryScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.grade"),
        }}
        name="TheoryGradeScreen"
        component={TheoryGradeScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.questions"),
        }}
        name="TheoryQuestionsScreen"
        component={TheoryQuestionsScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.practice"),
        }}
        name="PracticeScreen"
        component={PracticeScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.grade"),
        }}
        name="PracticeGradeScreen"
        component={PracticeGradeScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
