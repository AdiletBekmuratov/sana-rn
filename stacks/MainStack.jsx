import { getHeaderTitle } from "@react-navigation/elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "@/components/Header";
import i18n from "@/utils/i18n";
import EndScreen from "@/screens/EndScreen";
import Home from "@/screens/Home";

import {
  TheoryGradeScreen,
  TheoryQuestionsScreen,
  TheoryScreen,
} from "@/screens/Theory";

import {
  PracticeScreen,
  MasteredWrongQuestionsScreen,
  PracticeGradeScreen,
  PracticeQuestionsScreen,
} from "@/screens/Practice";

import { RandomScreen, RandomQuestionsScreen } from "@/screens/Random";

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
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.questions"),
        }}
        name="PracticeQuestionsScreen"
        component={PracticeQuestionsScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.random"),
        }}
        name="RandomScreen"
        component={RandomScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.questions"),
        }}
        name="RandomQuestionsScreen"
        component={RandomQuestionsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          title: i18n.t("MainStack.results"),
        }}
        name="EndScreen"
        component={EndScreen}
      />
      <Stack.Screen
        options={{
          title: i18n.t("MainStack.questions"),
        }}
        name="MasteredWrongQuestionsScreen"
        component={MasteredWrongQuestionsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
