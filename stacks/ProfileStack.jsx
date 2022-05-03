import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../components/Header";
import ChangeProfile from "../screens/ChangeProfile";
import Profile from "../screens/Profile";
import { getHeaderTitle } from "@react-navigation/elements";
import i18n from "../i18n";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
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
          title: i18n.t("ProfileStack.profile"),
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          title: i18n.t("ProfileStack.profile_edit"),
        }}
        name="ChangeProfile"
        component={ChangeProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
