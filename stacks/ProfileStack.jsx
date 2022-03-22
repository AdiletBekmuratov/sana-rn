import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "../components/Header";
import ChangeProfile from "../screens/ChangeProfile";
import Profile from "../screens/Profile";
import { getHeaderTitle } from "@react-navigation/elements";

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
          title: "Профиль",
        }}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={{
          title: "Профиль өзгерту",
        }}
        name="ChangeProfile"
        component={ChangeProfile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
